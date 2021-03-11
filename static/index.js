$(document).ready(function() {
    
    // user is forced to enter a chat name
    $('#chatname').keyup(function(){
        $('#goChat').attr('disabled', false);
    });

    // display title of last visited channel 
    if($('#page_name').html() == '') {
        document.getElementById('page_name').innerHTML = 'General Chat';
    } else {
        document.getElementById('page_name').innerHTML = localStorage.getItem('channel_title');
    }
          
    // display chat history by applicable channel
    displayChatHistory();
    
    // setup socket connection
    var socket = io.connect('http://127.0.1:5000');
    
    // display new chat message
    socket.on('message', function(msg) {
        $('#message_list').append('<li>' + msg + '</li>');
        console.log('Received message');
                        
    });

    // add new message
    $('#sendbutton').on('click', function() {
        var message = document.getElementById('myMessage').value;
                
        var now = currentTime();
        socket.send(now + " - " + username + ": " + message);
       
        var newItem = {
            'channel' : document.getElementById('page_name').innerHTML, 
            'username' : username,
            'time' : now,
            'message' : message
        };
        
        // take messages object and make it a blank array
        messages = JSON.parse(localStorage.getItem('newItem') || '[]');

        // add message to array
        messages.push(newItem);

        // if more than 100 messages, delete the oldest message
        if(messages.length > 100) {
            messages.splice(0,1);
        }
        
        // add contents of array to localStorage
        localStorage.setItem('newItem', JSON.stringify(messages));

        // clear the message box
        $('#myMessage').val('');

        //don't refresh the page after posting message
        return false;
               
    });
    // title of page changes and channel chat appears by clicking the appropriate channel
    var ul = document.getElementById('channel_list');
    ul.onclick = function(event) {
        var target = getEventTarget(event);
        document.getElementById('page_name').innerHTML = target.innerHTML;
        // add to localStorage
        localStorage.setItem('channel_title', target.innerHTML);
        
        // display chat history according to channel 
        $('#message_list').empty();

        var chat_history = JSON.parse(localStorage.getItem('newItem') || '[]');

        if(chat_history) {
            for(i = 0; i < chat_history.length; i++) {
                if(chat_history[i].channel == document.getElementById('page_name').innerHTML) {
                    $('#message_list').append('<li>' + chat_history[i].time + " - " + chat_history[i].username + ": " + chat_history[i].message + '<li>');
                }
            }
        }
      
        //display title of last visited channel
        document.getElementById('page_name').innerHTML = localStorage.getItem('channel_title');
    }
    
    // create a channel
    $('#create_channel').on('click', function() {
        // clear channel box
        $('#new_channel').val('');

        // displays the text box and button
        $('#name_new_channel').css('display', 'inline');

        // prevent typing a blank channel
        $('#new_channel').keyup(function(){
            $('#channel_button').attr('disabled', false);
        })

        $('#channel_button').on('click', function() {
            //add channel to channelbar
            var channel_name = document.getElementById('new_channel').value;
            var channel = {
                'channel' : channel_name
            };
            
            // create blank list of created channels
            channels = JSON.parse(localStorage.getItem('channel') || '[]');

            // check whether channel already exists, also can't create another General Chat
                        
            if(trimLowerCase(channel_name) == "general chat"){ // has to be double quotes because reasons
                channelAlreadyExists();
                return;
            }

            for(i = 0; i < channels.length; i++){ 
                if(trimLowerCase(channels[i].channel) == trimLowerCase(channel_name)){
                    channelAlreadyExists();
                    return;
                }
            } 
            channels.push(channel);

            // add channel to channelBar
            $('#channel_list').append('<li><a type="button">' + channel.channel + '</a></li>');
            
            // add channel to localStorage
            localStorage.setItem('channel', JSON.stringify(channels));
    })
})
    function channelAlreadyExists(){
        alert('Channel already exists! Please choose another name.');
    }

    // function converting input channel names to lowercase and trim whitespace
    function trimLowerCase(word){
        return word.toLowerCase().trim();
    }

    // add leading zero to minutes
    function add_zero(value) {
        if(value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }
    // gets name of channel clicked
    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
    }

    // function to return current date and time
    function currentTime() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        var month = months[today.getMonth()];
        var date = month + ' ' + today.getDate();
        var dt = today.getHours() + ':' + add_zero(today.getMinutes());
        return date + ' ' + dt;
    }

    // function to display chat history and created channels
    function displayChatHistory() {
        // temporarily cleared messages so they can appear under correct channel
        $('#message_list').empty();

        var chat_history = JSON.parse(localStorage.getItem('newItem') || '[]');

        if(chat_history) {
            for(i = 0; i < chat_history.length; i++) {
                if(chat_history[i].channel == document.getElementById('page_name').innerHTML) {
                    $('#message_list').append('<li>' + chat_history[i].time + " - " + chat_history[i].username + ": " + chat_history[i].message + '<li>');
                }
            }
        }
    }
        
        var show_channels = JSON.parse(localStorage.getItem('channel') || '[]');
        
        $('channel_list').detach();
        for(i = 0; i < show_channels.length; i++) {
            $('#channel_list').append('<li><a type="button">' + show_channels[i].channel + '</a></li>');
    }
})
