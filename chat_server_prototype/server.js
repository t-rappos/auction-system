//There is no additional state stored in this file...
//all state is stored in severState.js, which is basically modelling an external DB.

var express = require("express");
var bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ServerState = require('./serverState.js');

//app.get('/', function(req, res){
//  res.send('<!doctype html>\
//<html>\
//  <head>\
//    <title>Socket.IO chat</title>\
//    <style>\
//      * { margin: 0; padding: 0; box-sizing: border-box; }\
//      body { font: 13px Helvetica, Arial; }\
//      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }\
//      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }\
//      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }\
//      #messages { list-style-type: none; margin: 0; padding: 0; }\
//      #messages li { padding: 5px 10px; }\
//      #messages li:nth-child(odd) { background: #eee; }\
//    </style>\
//  </head>\
//  <body>\
//    <ul id="messages"></ul>\
//    <form action="">\
//      <input id="m" autocomplete="off" /><button>Send</button>\
//    </form>\
//    <script src="/socket.io/socket.io.js"></script>\
//  <script>\
//    var socket = io();\
//  </script>\
//  </body>\
//</html>');
//});

function CheckCallback(cb, message)
{
  var result = (cb && typeof cb === "function" );
  if (!result){throw new Error(message, "callback not provided");}
  return result;
}

io.on('connection', function(socket){
  console.log('a user connected');

// io.emit('this', { will: 'be received by everyone'});

  //callback() -> handleMessageList(messageList)
  socket.on('get_messages', function(returnMessages){
    CheckCallback(returnMessages,'get_messages');
    var messages = ServerState.getMessages();
    if (messages){console.log('get_messages:',messages.length);}
    returnMessages(messages);
  });

  //callback() -> handleUserList(userlist))
  socket.on('get_users', function(returnUsers){
    CheckCallback(returnUsers,'get_users');

    var users = ServerState.getUsers();
    if (users){console.log('get_users:',users.length);}
    returnUsers(users);
  });

  //data = username
  //callback = checkSuccess(success)
  socket.on('login', function(username,wasSuccessful){
    CheckCallback(wasSuccessful,'login');
    if (!username){throw new Error("error: login needs username");}
    console.log('login',username);
    var success = ServerState.addUser(username);
    console.log("Online users ", ServerState.getNumberOfUsers());
    wasSuccessful(success);
    socket.emit('login',username); //send to all clients
    //TODO: tell client that they logged in successfully
  });

  //data = username
  //callback = checkSuccess(success)
  socket.on('logout', function(username,wasSuccessful){
    CheckCallback(wasSuccessful,'logout');
    if (!username){throw new Error("error: logout needs username");}
    console.log('logout',username);
    var success = ServerState.removeUser(username);
    console.log("Online users ", ServerState.getNumberOfUsers());
    wasSuccessful(success);
    socket.emit('logout',username); //send to all clients
  });

  //data = {author,message};
  //callback = checkSuccess(success)
  socket.on('message', function(data,wasSuccessful){
    CheckCallback(wasSuccessful,'message');
    var author = data.author;
    var message = data.message;
    if (!author){throw new Error("error: message needs author");}
    if (!message){throw new Error("error: message needs contents");}
    console.log('author:',author, 'message:',data);
    var msg = ServerState.addMessage(author,message);
    if (!msg)
    {
      wasSuccessful(false);
      throw new Error("error: message not created properly");
    }
    else
    {
      wasSuccessful(true);
    }
    socket.emit('message',msg); //send to all clients
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


//app.use( bodyParser.json() );       // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//  extended: true
//}));

app.use(express.static('public'));

/*
function loginUser(user)
{
  serverState.addUser(user);
  console.log("Online users ", serverState.getNumberOfUsers());
};

function logoutUser(user)
{
  serverState.removeUser(user);
  console.log("Online users ", serverState.getNumberOfUsers());
};

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


//{user: 'username'}
app.post('/api/login',function(req,res){
  console.log(req.body);
  var loginUser = req.body.user;
  console.log('user attempting to login : ', loginUser);
  loginUser(loginUser);
  res.json([{success : true}]);

});

//{user: 'username'}
app.post('/api/logout',function(req,res){
  console.log(req.body);
  var ll = req.body.user;
  console.log('user attempting to logout : ', ll);
  logoutUser(ll);
  res.json([{success : true}]);
});

app.listen(3000,function(){
  console.log("express server is up");
});

*/
