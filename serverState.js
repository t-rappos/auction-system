var users = []; //[{user:,socket:}...]
var sockets = [];
var messages = [];

//THIS IS THE SERVER MODEL
//Note: only model behaviour, e.g. no SOCKET-IO functionality here!

function createMessage(_author,_message)
{
  var _date = new Date();
  var result =
  {
    author: _author,
    message: _message,
    date: _date
  };

  return result;
}

module.exports =
{

  getMessages : function()
  {
    return messages;
  },

  addMessage : function(author,message)
  {
    var msg = createMessage(author,message);
    messages.push(msg);
    return msg;
  },


  getNumberOfUsers : function()
  {
    return users.length;
  },

  getUsers : function()
  {
    return users;
  },

  addUser : function(user,socket)
  {
    //make sure user isn't already here,
    console.log('ServerState:addUser');
    var index = users.indexOf(user);
    var success = index === -1;
    if (success){
      users.push(user);
      sockets.push(socket);
    }
    return success;
  },

  removeUser : function(user)
  {
    console.log('ServerState:removeUser');
    var index = users.indexOf(user);
    if (index > -1){
      users.splice(index,1);
      sockets.splice(index,1);
    }
    return index !== -1;
  },

  removeConnection : function(socket,callback)
  {
    console.log('ServerState:removeConnection');
    var index = sockets.indexOf(socket);
    if (index != -1){
      var user = users[index];
      callback(user);
    }
  }
};
