var React = require('react');
var ServerApi = require('../api/server.jsx');
var Login = require('./login.jsx');
const appStyle = {

};

const mainWindowStyle = {

};

var Main = React.createClass({

  render: function(){
    ServerApi.sendUserLoginRequest('tom');
    return (
      <div ref={node => this.node = node} style={appStyle}>
        <div className='expanded row' style={mainWindowStyle} >
          <Login/>
        </div>
      </div>
    );
  }
});

module.exports = Main;
