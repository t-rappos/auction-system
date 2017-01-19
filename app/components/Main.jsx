var React = require('react');
var ChatComponent = require('ChatComponent');
var ChatContainer = require('ChatContainer');
var OnlineUsersListContainer = require('OnlineUsersListContainer');
var UsernameInputFormContainer = require('UsernameInputFormContainer');
var ChatInputFormContainer = require('ChatInputFormContainer');
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

var Main = React.createClass({

  render: function(){
    return (
      <div style={appStyle}>
        <div style={mainWindowStyle} >
            <ChatContainer getMessageListFromServer = {ServerApi.getMessageList}
            setCallbackForNewMessages = {ServerApi.setOnMessageCallback}/>
            <OnlineUsersListContainer/>
        </div>
        <div style={subWindowStyle}>
          <ChatInputFormContainer/>
          <UsernameInputFormContainer/>
        </div>
      </div>
    );
  }
});

module.exports = Main;


    //ServerApi.getUserList();
    //ServerApi.getMessageList(function(messages)
    //{
    //  console.log('main: getMessageList callback');
    //});
    //ServerApi.sendUserLoginRequest('tom');
    //ServerApi.sendMessage('tom','hello world');
    //ServerApi.sendUserLogoutNotification('tom');
