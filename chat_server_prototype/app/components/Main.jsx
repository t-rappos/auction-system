var React = require('react');
var ChatComponent = require('ChatComponent');
var OnlineUsersListComponent = require('OnlineUsersListComponent');
var UsernameInputFormComponent = require('UsernameInputFormComponent');
var ChatInputFormComponent = require('ChatInputFormComponent');


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
            <ChatComponent/>
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
