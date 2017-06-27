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

function sendInventoryViewRequest(callback){
  return new Promise((resolve, reject)=>{
    socket.emit('view_items', callback);
  });
}

function sendAccountModifyRequest(email, details, callback){
  let options = {email : email, details : details};
  return new Promise((resolve, reject)=>{
    socket.emit('modify_account', options, callback);
  });
}

function sendAccountViewRequest(callback){
  return new Promise((resolve, reject)=>{
    socket.emit('view_account', callback);
  });
}

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
  sendAccountViewRequest : sendAccountViewRequest,
  sendUserLoginRequest : sendUserLoginRequest,
  sendAccountCreationRequest : sendAccountCreationRequest,
  sendAccountModifyRequest : sendAccountModifyRequest,
  sendInventoryViewRequest : sendInventoryViewRequest
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
