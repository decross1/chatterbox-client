// YOUR CODE HERE:
var app = {

  init: function() {

    app.fetch();

    $('#send .submit').on('click', function(event) {
      app.handleSubmit(window.location.search.slice(10), event.value, roomname);
    }); 
    
    $('body').on('click', '.username', function(event) {
      app.handleUsernameClick();
    });
      
  }, 

  handleSubmit: function(username, text, room) {
    app.send(text);
  },
  
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      type: 'GET',
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      contentType: 'application/json',
      success: function (messages) {
        for (var i = 0; i < messages.results.length; i++) {
          var currentMessage = messages.results[i]; 
          app.renderMessage(currentMessage);
        }
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Server not found');
      }
    });
  
  }, 

  send: function(message) {

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: message,
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



