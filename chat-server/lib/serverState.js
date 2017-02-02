var debug = require('./logger.js');

let users = []; //[{user:,socket:}...]
var sockets = [];
var messages = [];

//THIS IS THE SERVER MODEL
//Note: only model behaviour, e.g. no SOCKET-IO functionality here!

function createMessage(_author,_message){
  var _date = new Date();
  var result = {
    author: _author,
    message: _message,
    date: _date
  };
  return result;
}

function getMessages(){
  debug.log('getMessages:');
  return messages;
}

//loads a message from the database
//msg = {author, message, date}
function loadMessage(msg){
  if (!msg.author || !msg.message || !msg.date){
    throw new Error("ServerState: loadMessage: msg incorrect format",msg);
  }
  else {
    messages.push(msg);
  }
  return msg;
}

function addMessage(author,message){
  var msg = createMessage(author,message);
  messages.push(msg);
  return msg;
}

function getNumberOfUsers(){
  return users.length;
}

function getUsers(){
  return users;
}

//TODO: user can be offline e.g. a historical user
function addUser(user,socket){
  //make sure user isn't already here,
  debug.log('ServerState:addUser');
  var index = users.indexOf(user);
  var success = (index === -1);
  if (success){
    users.push(user);
    sockets.push(socket);
  }
  return success;
}

//TODO: make this alter the users status from online to offline
function removeUser(user){
  debug.log('ServerState:removeUser');
  var index = users.indexOf(user);
  if (index > -1){
    users.splice(index,1);
    sockets.splice(index,1);
  }
  return index !== -1;
}

function removeConnection(socket,callback){
  debug.log('ServerState:removeConnection');
  var index = sockets.indexOf(socket);
  if (index != -1){
    var user = users[index];
    callback(user);
  }
}

module.exports = {
  getMessages : getMessages,
  loadMessage : loadMessage,
  addMessage : addMessage,
  getNumberOfUsers : getNumberOfUsers,
  getUsers : getUsers,
  addUser : addUser,
  removeUser : removeUser,
  removeConnection : removeConnection
};
