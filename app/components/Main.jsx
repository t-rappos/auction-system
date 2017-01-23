var React = require('react');
var ChatContainer = require('ChatContainer');
var OnlineUsersListContainer = require('OnlineUsersListContainer');
var UsernameInputFormContainer = require('UsernameInputFormContainer');
var ChatInputFormContainer = require('ChatInputFormContainer');
var ServerApi = require('ServerAPI');

const appStyle = {
//  width: '100%',
//  overflow: 'hidden'
};

const mainWindowStyle = {
  color: 'blue',
//  display:'flex',
//  flexDirection: 'row',
//  flex:'1',
};

const subWindowStyle = {
  color: 'red',
//  display:'flex',
//  flexDirection: 'row',
};

var Main = React.createClass({

  render: function(){
    return (
      <div ref={node => this.node = node} style={appStyle}>
        <div className='expanded row' style={mainWindowStyle} >
          <div className='small-8 large-8 columns'>
          <ChatContainer
            getMessageListFromServer = {ServerApi.getMessageList}
            setCallbackForNewMessages = {ServerApi.setOnMessageCallback}/>
          </div>
          <div className='small-4 large-4 columns'>
          <OnlineUsersListContainer
            getUserListFromServer = {ServerApi.getUserList}
            setCallbackForLogins = {ServerApi.setOnLoginCallback}
            setCallbackForLogouts = {ServerApi.setOnLogoutCallback}/>
          </div>
        </div>
        <div className='expanded row' style={subWindowStyle}>
          <div className='large-8 columns'>
            <ChatInputFormContainer
            sendMessageToServer ={ServerApi.sendMessage}/>
          </div>
          <div className='large-4 columns'>
            <UsernameInputFormContainer
            sendLoginRequestToServer = {ServerApi.sendUserLoginRequest}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
