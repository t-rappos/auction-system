//There is no additional state stored in this file...
//all state is stored in severState.js, which is basically modelling an external DB.


var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ServerState = require('./serverState.js');
var ServerDB = require('./serverDB.js');

var debug = require('./logger.js');

function CheckCallback(cb, message){
  var result = (cb && typeof cb === "function" );
  if (!result){
    throw new Error(message, "callback not provided");
  }
  return result;
}

var logout = (user, successCallback) => {
  if (!user){
    throw new Error("error: logout needs username");
  }
  var success = ServerState.removeUser(user);
  debug.log('logout was successful :',success,' for user ',user);
  debug.log("Online users ", ServerState.getNumberOfUsers());
  if (typeof(successCallback) === 'function' ){
    successCallback(success);
  }
  if (success){
    io.emit('logout',user);
  }
};

function onUserConnection(){
  debug.log('user connected');
}

function onUserDisconnection(socket){
  debug.log('user disconnected');
  ServerState.removeConnection(socket,(user)=>{
    logout(user);
  });
}

function onGetMessagesRequest(callback){
  CheckCallback(callback,'get_messages');
  var messages = ServerState.getMessages();
  if (messages){
    debug.log('get_messages:',messages.length);
  }
  callback(messages);
}

function onGetUsersRequest(callback){
  CheckCallback(callback,'get_users');
  var users = ServerState.getUsers();
  if (users){
    debug.log('get_users:',users.length);
  }
  callback(users);
}

//data = username
//callback = checkSuccess(success)
function onLogin(username,callback,socket){
  debug.log('checking username ',username);
  CheckCallback(callback,'login');
  if (!username){
    throw new Error("error: login needs username");
  }
  debug.log('login',username);
  var success = ServerState.addUser(username,socket);
  debug.log("login :",success," ,Online users ", ServerState.getNumberOfUsers());
  callback(success);
  io.emit('login',username); //send to all clients
}

//data = {author,message};
//callback = checkSuccess(success)
function onMessage(msgObj,callback){
  CheckCallback(callback,'message');
  var author = msgObj.author;
  var message = msgObj.message;
  if (!author){
    throw new Error("error: message needs author");
  }
  if (!message){
    throw new Error("error: message needs contents");
  }
  debug.log('author:',author, 'message:',msgObj);
  var msg = ServerState.addMessage(author,message);
  ServerDB.stageMessage(msg);
  if (!msg){
    callback(false);
    throw new Error("error: message not created properly");
  } else {
    callback(true);
  }
  debug.log('sending message notification to all clients');
  io.emit('message',msg); //send to all clients
}

io.on('connection', function(socket){
  onUserConnection();

  socket.on('disconnect',function(){
    onUserDisconnection(socket);
  });

  socket.on('get_messages', function(returnMessages){
    onGetMessagesRequest(returnMessages);
  });

  socket.on('get_users', function(returnUsers){
    onGetUsersRequest(returnUsers);
  });

  socket.on('login', function(username,wasSuccessful){
    onLogin(username,wasSuccessful,socket);
  });

  socket.on('logout', function(username,wasSuccessful){
    CheckCallback(wasSuccessful,'logout');
    logout(username,wasSuccessful);
  });

  socket.on('message', function(data,wasSuccessful){
    onMessage(data,wasSuccessful);
  });
});

function httpListen(port){
  http.listen(port, function(){
    debug.log('listening on *:',port);
  });
}
httpListen(process.env.PORT || 3000);


app.use(express.static('public'));


ServerDB.initialise(function(){
  ServerDB.loadMessages(function(result){
    result.map(function(msg){
      ServerState.loadMessage(msg);
    });
  });
});

//periodic call that adds all new messages/users to the database
function stashMessages(){
  ServerDB.storeMessages();
  setTimeout(function(){
    stashMessages();
  },10000);
}

function setStashPeriodic(){
  setTimeout(function(){
    stashMessages();
  },10000);
}
setStashPeriodic();

debug.log("finished initialising server");
