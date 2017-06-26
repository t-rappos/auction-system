var React = require('react');
var TabContainer = require('./tabContainer.jsx').TabContainer;
var Tab = require('./tabContainer.jsx').Tab;
var RegisterForm = require('./registerForm.jsx');
var LoginForm = require('./LoginForm.jsx');

const appStyle = {

};

const mainWindowStyle = {

};

var LoginContainer = React.createClass({

  render: function(){
    return (
      <div ref={node => this.node = node} style={appStyle}>
        <div className='expanded row' style={mainWindowStyle} >
          <TabContainer>
            <Tab name = 'Login'><LoginForm/></Tab>
            <Tab name = 'Register'><RegisterForm/></Tab>
          </TabContainer>
        </div>
      </div>
    );
  }
});

module.exports = LoginContainer;
