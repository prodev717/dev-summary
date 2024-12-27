from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    return "<h1>HTMX test</h1>"

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000)


