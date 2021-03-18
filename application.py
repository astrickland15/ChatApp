import os

from flask import Flask, render_template, request
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config["SECRET_KEY"] = "a886e95cfe3b0c51f4f72abf1c1d4c2b"
socketio = SocketIO(app)
<<<<<<< HEAD
connectedUsers = []
=======
>>>>>>> be60a6fcec755b8a83639492fb5a799946e34cf8

@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    else:
        user = request.form.get("chatname")
<<<<<<< HEAD
        if (user not in connectedUsers):
            connectedUsers.append(user)
        return render_template("chat.html",  user = user, connectedUsers = connectedUsers)

@socketio.on("message")
def chat(msg):
    print("Message: " + msg)
    add_to_text_file(msg)
    send(msg, broadcast = True)
      
=======
        return render_template("chat.html",  user = user)
  
@socketio.on("message")
def chat(msg):
    print("Message: " + msg)
    """ add_to_text_file(msg)
    send(msg, broadcast = True) """
    

>>>>>>> be60a6fcec755b8a83639492fb5a799946e34cf8
def add_to_text_file(word):
    f = open("c:\\test\chatHistory.txt", "a")
    f.write(word + "\n")
    f.close()


if __name__ == "__main__":
    socketio.run(app)
