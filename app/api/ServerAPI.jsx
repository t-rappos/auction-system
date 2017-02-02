/////////////
// CALLBACKS//
/////////////

import io from 'socket.io-client';

let socket = io();

function safeCall(callback, data){
  if (typeof(callback)==='function'){
    callback(data);
  } else {
     throw new Error("safecall expected a function");
   }
}

var serverApiOnLoginCallback;
socket.on('login', function(username){
  safeCall(serverApiOnLoginCallback,username);
});

var serverApiOnLogoutCallback;
socket.on('logout', function(username){
  safeCall(serverApiOnLogoutCallback,username);
});

var serverApiOnMessageCallback;
socket.on('message', function(data){
  safeCall(serverApiOnMessageCallback,data);
});

module.exports = {

////////////////////
//Public CALLBACKS//
////////////////////

//calls an external function when a new message is sent from the server
setOnMessageCallback: function(callback){
  serverApiOnMessageCallback = callback;
},

setOnLoginCallback: function(callback){
  serverApiOnLoginCallback = callback;
},

setOnLogoutCallback: function(callback){
  serverApiOnLogoutCallback = callback;
},

/////////////////////
//Public server API//
/////////////////////
getUserList: function(callback){
  socket.emit('get_users', function(users){
      callback(users);
  });
},

getMessageList: function(callback){
  socket.emit('get_messages', function(messages){
    callback(messages);
  });
},

sendUserLoginRequest: function(username,callback)
{
  socket.emit('login',username, function(success){
    callback(success);
  });
},

sendUserLogoutNotification : function(username)
{
  alert('starting logging out');
  socket.emit('logout',username, function(success){
  });
  alert('logging out');
},

sendMessage : function(_author, _message)
{
  var data = {author:_author, message:_message};
  socket.emit('message',data, function(success){
  });
}

};
