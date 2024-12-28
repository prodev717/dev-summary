from flask import Flask,render_template,request
import requests
import base64

def getReadmes(username):
    response = requests.get(f"https://api.github.com/users/{username}/repos").json()
    repos = {x["name"]:{"description":x["description"],"language":x["language"],"topics":x["topics"],"readme":None} for x in response}
    for repo in repos:
        repos[repo]["readme"] = base64.b64decode(requests.get(f"https://api.github.com/repos/{username}/{repo}/contents/README.md").json()["content"]).decode("utf-8")
    return repos

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/inp",methods=["POST"])
def inp():
    username = request.form.get("username")
    return getReadmes(username)

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=8000)


