from flask import Flask
from flask_cors import CORS
import requests
import json
import base64
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI = os.getenv("GEMINI_API_KEY")
GITHUB = os.getenv("GITHUB_API_KEY")

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
                "technologies and key features, use he or she to refer the dev based on their name."
                "Use only plain text with no formatting or special characters\n"
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
                return "Error generating AI response. Try again later."
        except Exception as e:
            print(f"Error with AI API: {e}")
            return "Error generating AI response. Try again later."
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
                "explain the project very detaily in a para"
                "Use only plain text with no formatting or special characters\n"
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
                return "Error generating AI response. Try again later."
        except Exception as e:
            print(f"Error with AI API: {e}")
            return "Error generating AI response. Try again later."
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

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000,debug=True)