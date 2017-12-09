
// YOUR CODE HERE:
var app = {

  init: function() {
    var roomFilter;    

    $(document).ready(function() {
      $('body').on('click', '#send', function(event) {
        var message = {
          username: window.location.search.slice(10),
          text: event.target.previousElementSibling.value,
          roomname: 'specialroom'
        };
        app.send(message);
        $('#MessageBox').val('');
      }); 

      $('body').on('click', '.username', function(event) {
        app.handleUsernameClick();
      });

      $('#dropDown').on('click', function(event) {
        roomFilter = event.target.id;
        app.fetch(roomFilter);
      });

      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName('dropdown-content');
          for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      };
      
    });
    
    app.fetch();

    setInterval(function() {
      app.fetch(roomFilter);
      
    }, 30000);
  }, 

  showRooms: function() {
    document.getElementById('dropDown').classList.toggle('show');
  },

  roomNames: {},

  fetch: function(roomFilter) {
    var data = {'order': '-createdAt'};
    var dataByRoomName = {'order': '-createdAt', 'where': {'roomname': roomFilter}};
    if (!roomFilter) {
      dataByRoomName = data;
    } 

    $.ajax({  
      // This is the url you should use to communicate with the parse API server.
      type: 'GET',
      data: dataByRoomName,
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
      contentType: 'application/json',
      success: function (messages) {
        app.clearMessages();

        for (var i = 0; i < messages.results.length; i++) {
          var currentMessage = messages.results[i]; 
          if (currentMessage.username === 'sp00ky%20ghost' || currentMessage.roomname === 'All') {
            continue;
          }
          if (currentMessage.text) {
            currentMessage.text = app.escapeHTML(currentMessage.text);  
          }
          if (currentMessage.username) {
            currentMessage.username = app.escapeHTML(currentMessage.username);
          }
          if (currentMessage.roomname) {
            currentMessage.roomname = app.escapeHTML(currentMessage.roomname);
            if (app.roomNames[currentMessage.roomname] === undefined) {
              app.roomNames[currentMessage.roomname] = 1;
            }
          }
          app.renderMessage(currentMessage);
        }
        app.renderRooms(app.roomNames);
      },
      error: function () {
        console.error('Server not found');
      }
    });
  }, 

  escapeHTML: function(unsafeMessage) {
    return unsafeMessage
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }, 

  clearMessages: function () {
    $('#chats').empty();
  }, 

  renderMessage: function (message) {
    $('#chats').append('<p roomName=' + message.roomname + '>' + message.username + ':' + message.text + '</p>');
  }, 
  
  renderRooms: function (rooms) {
    $('#dropDown').empty();
    for (var keys in rooms) {
      $('#dropDown').append('<li id=' + keys + '>' + keys + '</li>');
    }
  },

  handleUsernameClick: function () {
    console.log('ive been clicked');
  }
};

app.init();




