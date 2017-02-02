/////////////
// CALLBACKS//
/////////////

import io from 'socket.io-client';

let socket = io();

//a callback

/*
var serverApiOnLoginCallback;
socket.on('login', function(username){
  safeCall(serverApiOnLoginCallback,username);
});
*/

module.exports = {

////////////////////
//Public CALLBACKS//
////////////////////

//calls an external function when a new message is sent from the server
/*
setOnMessageCallback: function(callback){
  serverApiOnMessageCallback = callback;
},
*/

/////////////////////
//Public server API//
/////////////////////

/*Emit message*/
/*
getUserList: function(callback){
  socket.emit('get_users', function(users){
      callback(users);
  });
},
*/

};
