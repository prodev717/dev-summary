from flask import Flask,render_template,request
import requests
import json
import base64
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")

def getData(username):
    response = requests.get(f"https://api.github.com/users/{username}/repos").json()
    repos = {x["name"]:{"description":x["description"],"language":x["language"],"topics":x["topics"],"readme":None} for x in response}
    for repo in repos:
        repos[repo]["readme"] = base64.b64decode(requests.get(f"https://api.github.com/repos/{username}/{repo}/contents/README.md").json()["content"]).decode("utf-8")
    return repos
    
def aiResponse(username):
    repos = getData(username)
    api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}
    prompt = "data given below is a details of projects developed by a developer as json , summarize about him , what kind of developer he is? also discuss about his projects \n"
    response = requests.post(api,headers=headers,json={"contents": [{"parts": [{"text": prompt+json.dumps(repos)}]}]})
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/inp",methods=["POST"])
def inp():
    username = request.form.get("username")
    return aiResponse(username)

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=8000)


