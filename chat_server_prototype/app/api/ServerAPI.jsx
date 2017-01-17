var axios = require('axios');


/////////////
// CALLBACKS//
/////////////

function safeCall(callback, data){
  if (typeof(callback)==='function'){
    callback(data);
  } else {
    console.log("ServerAPI:safeCall: couldn't call callback", callback);
  }
}

var serverApiOnLoginCallback;
socket.on('login', function(username){
  console.log('login occured: ',username);
  safeCall(serverApiOnLoginCallback,username);
});

var serverApiOnLogoutCallback;
socket.on('logout', function(username){
  console.log('logout occured: ', username);
  safeCall(serverApiOnLogoutCallback,username);
});

var serverApiOnMessageCallback;
socket.on('message', function(data){
  console.log('message occured: ',data);
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
      console.log("ServerAPI:getUserList-callback", users);
      callback(users);
  });
},

getMessageList: function(callback){
  socket.emit('get_messages', function(messages){
    console.log("ServerAPI:getMessageList-callback : ",messages.length);
    callback(messages);
  });
},

sendUserLoginRequest: function(username,callback)
{
  socket.emit('login',username, function(success){
    console.log("ServerAPI:login-callback success:",success);
    callback(success);
  });
},

sendUserLogoutNotification : function(username)
{
  alert('starting logging out');
  socket.emit('logout',username, function(success){
    console.log("ServerAPI:logout-callback success:",success);
  });
  alert('logging out');
},

sendMessage : function(_author, _message)
{
  var data = {author:_author, message:_message};
  socket.emit('message',data, function(success){
    console.log("ServerAPI:message-callback success:",success);
  });
}

}
