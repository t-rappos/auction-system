var React = require('react');
var UserLoginList = require('UserLoginList');


var TabLogin = React.createClass({
  render: function(){
    return (
      <div>
        <h3>TabLogin</h3>
        <UserLoginList/>
      </div>
    );
  }
});

module.exports = TabLogin;
