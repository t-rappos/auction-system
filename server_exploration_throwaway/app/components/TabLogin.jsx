var React = require('react');
var UserLoginList = require('UserLoginList');


var TabLogin = React.createClass({

  render: function(){
    console.log('tab login', this);
    return (
      <div>
        <h3>TabLogin</h3>
        <UserLoginList/>
      </div>
    );
  }
});

module.exports = TabLogin;
