from flask import Flask,render_template,request
import requests
import json
import base64
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI = os.getenv("GEMINI_API_KEY")
GITHUB = os.getenv("GITHUB_API_KEY")

def getData(username):
    response = requests.get(f"https://api.github.com/users/{username}/repos",{"Authorization": f"token {GITHUB}"})
    if response.status_code==200:
        response = response.json()
        repos = {x["name"]:{"description":x["description"],"language":x["language"],"topics":x["topics"],"readme":None} for x in response}
        for repo in repos:
            try:
                repos[repo]["readme"] = base64.b64decode(requests.get(f"https://api.github.com/repos/{username}/{repo}/contents/README.md").json()["content"]).decode("utf-8")
            except:
                pass
        return repos
    else:
        return None
    
def aiResponse(username):
    repos = getData(username)
    if repos!=None:
        api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI}"
        headers = {"Content-Type": "application/json"}
        prompt = "The data below is a JSON representation of projects developed by a developer. Provide a plain text summary of the developer's skills, experience, and what kind of developer they are based on these projects. Include an explanation of their projects, highlighting the technologies and key features, use he or she to refer the dev based on their name. Use only plain text with no formatting or special characters\n"
        response = requests.post(api,headers=headers,json={"contents": [{"parts": [{"text": prompt+json.dumps(repos)}]}]})
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]
    else:
        return "Something went wrong try again later"

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/fetch",methods=["POST"])
def inp():
    username = request.form.get("username")
    return "<p class='text-white text-3xl'>The Summary of "+username+"</p><br>"+"<p class='text-white text-xl'>"+aiResponse(username)+"</p>" 

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=8000)


