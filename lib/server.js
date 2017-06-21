//There is no additional state stored in this file...
//all state is stored in severState.js, which is basically modelling an external DB.

var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var debug = require('./utility.js');


io.on('connection', function(socket){
    //on connection code
    console.log("io.on(connection)");

  socket.on('disconnect',function(){
    console.log("socket.on(disconnect)");
    //on disconnection
  });

  socket.on('login', function(username, done){
    console.log(username +" tried to login");
    //done();
  });
  //Calls a return function to pass data back
  /*
  socket.on('get_messages', function(returnMessagesFn){

  });
  */

});

function httpListen(port){
  http.listen(port, function(){
    debug.log('listening on *:',port);
  });
}
httpListen(process.env.PORT || 3000);
app.use(express.static('public'));
debug.log("finished initialising server");
