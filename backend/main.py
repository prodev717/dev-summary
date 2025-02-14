from flask import Flask,request,jsonify
from flask_cors import CORS
import requests
import json
import base64
from dotenv import load_dotenv
import os
import json
import redis

load_dotenv()
GEMINI = os.getenv("GEMINI_API_KEY")
GITHUB = os.getenv("GITHUB_API_KEY")
REDIS = os.getenv("REDIS_URL")
session = redis.Redis.from_url(REDIS)

def getUserData(username):
    try:
        headers = {"Authorization": f"token {GITHUB}"}
        response = requests.get(f"https://api.github.com/users/{username}/repos",headers=headers)
        if response.status_code == 200:
            response = response.json()
            repos = {
                x["name"] : {
                    "description":x["description"],
                    "language":x["language"],
                    "topics":x["topics"],
                    "created_at":x["created_at"],
                    "updated_at":x["updated_at"],
                    "readme":None                    
                } 
                for x in response
            }
            for repo in repos:
                try:
                    readme = requests.get(
                        f"https://api.github.com/repos/{username}/{repo}/contents/README.md",headers=headers
                    )
                    if readme.status_code == 200:
                        repos[repo]["readme"] = base64.b64decode(
                            readme.json()["content"]
                        ).decode("utf-8")
                except Exception as e:
                    print(f"Error fetching README for repo {repo}: {e}")
            return repos
        else:
            print(f"GitHub API error: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Error fetching data from GitHub: {e}")
        return None
    
def aiResponseUser(username):
    repos = getUserData(username)
    if repos:
        try:    
            api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI}"
            headers = {"Content-Type": "application/json"}
            prompt = (
                "The data below is a JSON representation of projects developed by a developer."
                "Provide a plain text summary of the developer's skills, experience, and what kind of developer"
                "they are based on these projects. Include an explanation of their projects, highlighting the"
                "technologies and key features, use he or she to refer the dev based on their name.\n"
            )
            response = requests.post(
                api,
                headers=headers,
                json={"contents": [{"parts": [{"text": prompt+json.dumps(repos)}]}]}
            )
            if response.status_code == 200:
                return response.json()["candidates"][0]["content"]["parts"][0]["text"]
            else:
                print(f"AI API error: {response.status_code} - {response.text}")
                return f"Error generating AI response. Status code: {response.status_code}. Details: {response.text}"
        except Exception as e:
            print(f"Error with AI API: {e}")
            return f"Error generating AI response. Exception : {e}"
    else:
        return "Error fetching repository data. Check the GitHub username and try again."
    
def getRepoData(username,reponame):
    headers = {"Authorization": f"token {GITHUB}"}
    try:
        readme = requests.get(f"https://api.github.com/repos/{username}/{reponame}/contents/README.md",headers=headers)
        if readme.status_code == 200:
            return base64.b64decode(readme.json()["content"]).decode("utf-8")
    except Exception as e:
        print(f"Error fetching README for repo {reponame}: {e}")
        return None

def aiResponseRepo(username,reponame):
    readme = getRepoData(username,reponame)
    if readme:
        try:    
            api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI}"
            headers = {"Content-Type": "application/json"}
            prompt = (
                "The data below is a README content of particular project developed by a developer."
                "explain the project very detaily in a para\n"
            )
            response = requests.post(
                api,
                headers=headers,
                json={"contents": [{"parts": [{"text": prompt+json.dumps(readme)}]}]}
            )
            if response.status_code == 200:
                return response.json()["candidates"][0]["content"]["parts"][0]["text"]
            else:
                print(f"AI API error: {response.status_code} - {response.text}")
                return f"Error generating AI response. Status code: {response.status_code}. Details: {response.text}"
        except Exception as e:
            print(f"Error with AI API: {e}")
            return f"Error generating AI response. Exception : {e}"
    else:
        return "Error fetching repository data. Check the GitHub username and reponame again."    

app = Flask(__name__)
CORS(app)

@app.route("/devinfo/<username>")
def devsummary(username):
    return {"summary":aiResponseUser(username)}

@app.route("/repoinfo/<username>/<reponame>")
def reposummary(username,reponame):
    return {"summary":aiResponseRepo(username,reponame)}

@app.route("/load/<username>")
def loadprofile(username):
    repos = getUserData(username)
    if repos:
        try:
            session.set(username,json.dumps(repos),600)
            return jsonify({"message": "Data loaded successfully"}), 200
        except Exception as e:
            print(f"Error caching data: {e}")
            return jsonify({"error": "Internal Server Error", "message": "Failed to cache data."}), 500
    else:
        return jsonify({"error": "Not Found", "message": "GitHub user not found."}), 404

@app.route("/load/<username>/<reponame>")
def loadrepo(username,reponame):
    readme = getRepoData(username,reponame)
    if readme:
        try:
            session.set(username+"/"+reponame,json.dumps(readme),600)
            return jsonify({"message": "Data loaded successfully"}), 200
        except Exception as e:
            print(f"Error caching data: {e}")
            return jsonify({"error": "Internal Server Error", "message": "Failed to cache data."}), 500
    else:
        return jsonify({"error": "Not Found", "message": "GitHub user not found or repositories unavailable."}), 404
    
@app.route("/chatdev", methods=["POST"])
def chatUser():
    data = request.get_json()
    if not data or "username" not in data or "prompt" not in data:
        return jsonify({"error": "Bad Request", "message": "Missing 'username' or 'prompt' in request body."}), 400
    dev = session.get(data["username"])
    chathistory = session.get("chat_history:"+data["username"])
    if chathistory:
        chathistory = json.loads(chathistory.decode())
    else:
        chathistory = []
    if dev:
        try:    
            api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI}"
            headers = {"Content-Type": "application/json"}
            prompt0 = ("\n data of a developer is given," 
                       "ansewer the below question," 
                       "our chat history is provided answer relevently,"
                       "do not mention about chat history\n")
            chat_history = f"\n our chat history : {json.dumps(chathistory)} \n" 
            response = requests.post(
                api,
                headers=headers,
                json={"contents": [{"parts": [{"text": dev.decode()+prompt0+data["prompt"]+chat_history}]}]}
            )
            if response.status_code == 200:
                res = response.json()["candidates"][0]["content"]["parts"][0]["text"]
                chathistory.append({"user":data["prompt"]})
                chathistory.append({"gemini":res})
                session.set("chat_history:"+data["username"],json.dumps(chathistory),600)
                return res, 200
            else: 
                print(f"AI API error: {response.status_code} - {response.text}")
                return jsonify({"error": "AI API Error", "message": f"Status code: {response.status_code}. Details: {response.text}"}), 500
        except Exception as e:
            print(f"Error with Internal Server: {e}")
            return jsonify({"error": "Internal Server Error", "message": f"Exception: {e}"}), 500
    else:
        return jsonify({"error": "Not Found", "message": "No cached data found for the given username."}), 404
    
@app.route("/chatrepo", methods=["POST"])
def chatRepo():
    data = request.get_json()
    if not data or "username" not in data or "prompt" not in data or "repository" not in data:
        return jsonify({"error": "Bad Request", "message": "Missing 'username','repository' or 'prompt' in request body."}), 400
    repo = session.get(data["username"]+"/"+data["repository"])
    chathistory = session.get("chat_history:"+data["username"]+"/"+data["repository"])
    if chathistory:
        chathistory = json.loads(chathistory.decode())
    else:
        chathistory = []
    if repo:
        try:    
            api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI}"
            headers = {"Content-Type": "application/json"}
            prompt0 = ("\n data of a project is given," 
                       "ansewer the below question," 
                       "our chat history is provided answer relevently,"
                       "do not mention about chat history\n")
            chat_history = f"\n our chat history : {json.dumps(chathistory)} \n"
            response = requests.post(
                api,
                headers=headers,
                json={"contents": [{"parts": [{"text": repo.decode()+prompt0+data["prompt"]+chat_history}]}]}
            )
            if response.status_code == 200:
                res = response.json()["candidates"][0]["content"]["parts"][0]["text"]
                chathistory.append({"user":data["prompt"]})
                chathistory.append({"gemini":res})
                session.set("chat_history:"+data["username"]+"/"+data["repository"],json.dumps(chathistory),600)
                return res, 200
            else:
                print(f"AI API error: {response.status_code} - {response.text}")
                return jsonify({"error": "AI API Error", "message": f"Status code: {response.status_code}. Details: {response.text}"}), 500
        except Exception as e:
            print(f"Error with Internal Server: {e}")
            return jsonify({"error": "Internal Server Error", "message": f"Exception: {e}"}), 500
    else:
        return jsonify({"error": "Not Found", "message": "No cached data found for the given username/repository ."}), 404
