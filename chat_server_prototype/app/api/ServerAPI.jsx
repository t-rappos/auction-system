var axios = require('axios');

socket.on('login', function(username){
  console.log('login occured: ',username);
});

socket.on('logout', function(username){
  console.log('logout occured: ', username);
});

var serverApiOnMessageCallback;

socket.on('message', function(data){
  console.log('message occured: ',data);
  if (typeof(serverApiOnMessageCallback)==='function'){
    serverApiOnMessageCallback(data);
  }
});

module.exports = {

//calls an external function when a new message is sent from the server
setOnMessageCallback: function(callback){
  serverApiOnMessageCallback = callback;
},

getUserList: function(){
  socket.emit('get_users', function(users){
      console.log("ServerAPI:getUserList-callback", users);
  });
},

getMessageList: function(callback){
  socket.emit('get_messages', function(messages){
    console.log("ServerAPI:getMessageList-callback : ",messages.length);
    callback(messages);
  });
},

sendUserLoginRequest: function(username,callback)
{
  socket.emit('login',username, function(success){
    console.log("ServerAPI:login-callback success:",success);
    callback(success);
  });
},

sendUserLogoutNotification : function(username)
{
  alert('starting logging out');
  socket.emit('logout',username, function(success){
    console.log("ServerAPI:logout-callback success:",success);
  });
  alert('logging out');
},

sendMessage : function(_author, _message)
{
  var data = {author:_author, message:_message};
  socket.emit('message',data, function(success){
    console.log("ServerAPI:message-callback success:",success);
  });
}
/*
  getUsers: function (){
    return axios.get('/api')
    .then(function(res){

      console.log('api getUsers', res.data);

      let users = [];
      res.data.forEach(function(user){
        users.push(user.username);
      });

      return users;
    },
    function(res){
      //throw new Error(res.data.message);
    });
  },


  sendLoginChoice: function(data){
    return axios.post('/api/login',data)
    .then(function(response){
      console.log('sendLoginChoice success:', response);
      return response;
    })
    .catch(function(error){
      console.log('sendLoginChoice - post fail ', error);
      throw(error);
    });
  },

  sendLogout : function(username){
    var data = {username : username};
    return axios.post('/api/logout',data)
    .then(function(response){
      console.log('sendLogout success:', response);
      return response;
    })
    .catch(function(error){
      console.log('sendLogout - post fail', error);
      throw(error);
    });
  }
  */

}
