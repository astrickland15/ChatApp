# Project 2

Web Programming with Python and JavaScript

from flask import Flask, render_template, request
from flask_socketio import SocketIO, send

## Configuration Changes
in launch.json, add the following:

"env": {
                "FLASK_APP": "application.py",
                "FLASK_ENV": "development",
                "FLASK_DEBUG": "1"
            },


### Overview
application.py requests the user's chatname from the index.html page.  It also contains a brief function that transmits each message to all logged in users using the broadcast = True argument.

index.html prompts the user to create a chatname.  The button to create the username is disabled until a key is pressed so that a blank name cannot be entered.

chat.html is where the action happens!  Once you login, the option to create a channel appears (this is hidden on the login page).  If you're logging in for the first time, a generic "General Chat" channel is available.  Any messages are stored in this channel until one is created.  

When you create a channel, a text box apppears and again the button is disabled until a key is entered.  The channel is added to the channel bar alongside the General Chat Channel.  You are prevented from adding a channel that is already created.  Each time you select a channel, each message sent inside that channel is displayed below it.

The messages and Channel Names are stored in the browser's local storage, and the last used channel and its messages are retrieved each time you refresh or reopen the browser.

index.js stores all javascript and jquery code.

#### Personal Touch
Each message is appened to a text file to be viewed later as a chat history.
