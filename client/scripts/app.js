
// YOUR CODE HERE:
var app = {

  init: function() {
    
    $(document).ready(function() {
      $('body').on('click', '#send', function(event) {
        var message = {
          username: window.location.search.slice(10),
          text: event.target.previousElementSibling.value,
          roomname: ''
        };
        app.send(message);
        $('#MessageBox').val('');
      }); 

      $('body').on('click', '.username', function(event) {
        app.handleUsernameClick();
      });
    });
    
    app.fetch();

    setInterval(function() {
      app.fetch();
    }, 30000);
  }, 

  // handleSubmit: function(username, text, room) {
  //   app.send(text);
  // },
  
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      type: 'GET',
      data: {'order': '-createdAt'},
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
      contentType: 'application/json',
      // limit: 1000,
      success: function (messages) {
        for (var i = 0; i < messages.results.length; i++) {
          var currentMessage = messages.results[i]; 
          if (currentMessage.text) {
            currentMessage.text = app.escapeHTML(currentMessage.text);  
          }
          if (currentMessage.username) {
            currentMessage.username = app.escapeHTML(currentMessage.username);
          }
          if (currentMessage.roomname) {
            currentMessage.roomname = app.escapeHTML(currentMessage.roomname);
          }
          app.renderMessage(currentMessage);
        }
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
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
    $('#chats').append('<p>' + message.username + ':' + message.text + '</p>');
  }, 
  
  renderRoom: function (room) {
    $('#roomSelect').append('<p>' + room + '</p>');
  },

  handleUsernameClick: function () {
    console.log('ive been clicked');
    // $.ajax({
    //   url: 'http://parse.sfm6.hackreactor.com/chatterbox/users',
    //   type: 'PUT',
    //   data: username,
    //   contentType: 'application/json',
    //   success: function () {
    //     console.log('friend added!');
    //   },
    //   error: function () {
    //     console.error('failed to add friend');
    //   }
    // });
  }
};

app.init();




