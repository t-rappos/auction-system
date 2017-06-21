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


function sendUserLoginRequest(username){
  
  console.log("attempting to login");
  socket.emitAsync('login', username).timeout(1000)
  .then(()=>{
    console.log("logged in");
  })
  .catch((e)=>{
    console.log("logging in error");
    console.log(e);
  });
  //socket.emit('login',username, (res)=>{
  //  callback(res);
  //});
}

module.exports = {

  sendUserLoginRequest : sendUserLoginRequest
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
