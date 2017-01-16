var users = [];
var messages = [];

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

  addUser : function(user)
  {
    //make sure user isn't already here,
    var index = users.indexOf(user);
    var success = index === -1;
    if (success)
    {
      users.push(user);
    }
    return success;
  },

  removeUser : function(user)
  {
    var index = users.indexOf(user);
    if (index > -1)
    {
      users.splice(index,1);
    }
    return index !== -1;
  }
};
