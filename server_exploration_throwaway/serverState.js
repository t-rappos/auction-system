var users = [];

module.exports =
{
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
    users.push(user);
  },

  removeUser : function(user)
  {
    var index = users.indexOf(user);
    if (index > -1)
    {
      users.splice(index,1);
    }
  }
};
