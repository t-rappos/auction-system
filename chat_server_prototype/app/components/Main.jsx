var React = require('react');
var ChatComponent = require('ChatComponent');
var ChatContainer = require('ChatContainer');
var OnlineUsersListComponent = require('OnlineUsersListComponent');
var UsernameInputFormComponent = require('UsernameInputFormComponent');
var ChatInputFormComponent = require('ChatInputFormComponent');
var ServerApi = require('ServerAPI');

const appStyle = {
  width: '100%',
  overflow: 'hidden'
};

const mainWindowStyle = {
  color: 'blue',
  display:'flex',
  flexDirection: 'row',
  flex:'1',
};

const subWindowStyle = {
  color: 'red',
  display:'flex',
  flexDirection: 'row',
};

/*
getUserList: function(){
  socket.emit('get_users', function(users){
      console.log("ServerAPI:getUserList-callback", users);
  });
},

getMessageList: function(){
  socket.emit('get_messages', function(messages){
    console.log("ServerAPI:getMessageList-callback",messages);
  });
},

sendUserLoginRequest: function(username)
{
  socket.emit('login',username, function(success){
    console.log("ServerAPI:login-callback success:",success);
  });
},

sendUserLogoutNotification : function(username)
*/
var Main = React.createClass({
  render: function(){

    ServerApi.getUserList();
    ServerApi.getMessageList();
    ServerApi.sendUserLoginRequest('tom');
    ServerApi.sendMessage('tom','hello world');
    ServerApi.sendUserLogoutNotification('tom');

    return (
      <div style={appStyle}>
        <div style={mainWindowStyle} >
            <ChatContainer/>
            <OnlineUsersListComponent/>
        </div>
        <div style={subWindowStyle}>
          <ChatInputFormComponent/>
          <UsernameInputFormComponent/>
        </div>
      </div>
    );
  }
});

module.exports = Main;
