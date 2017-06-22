/////////////
// CALLBACKS//
/////////////

import io from 'socket.io-client';

let Promise = require('bluebird');
let socket = io();

socket.emitAsync = Promise.promisify(socket.emit);

//a callback

//function safeCall(callback, data){
//  if (typeof(callback)==='function'){
//    callback(data);
//  } else {
//     throw new Error("safecall expected a function");
//   }
//}

//var serverApiOnLoginCallback;
//socket.on('login', function(username){
//  safeCall(serverApiOnLoginCallback,username);
//});


function sendUserLoginRequest(username, password){
  return new Promise((resolve, reject)=>{
    socket.emit('login',{username : username, password : password}, (res)=>{
      resolve(res);
    });
  });
}

function sendAccountCreationRequest(username, email, password){
  return new Promise((resolve, reject)=>{
    socket.emit('create_account', {username: username, email : email, password : password}, (res)=>{
      resolve(res);
    });
  });
}

module.exports = {

  sendUserLoginRequest : sendUserLoginRequest,
  sendAccountCreationRequest : sendAccountCreationRequest
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
