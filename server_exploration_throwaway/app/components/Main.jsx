var React = require('react');
var Nav = require('Nav');
var Users = require('Users');

window.onbeforeunload = function (e) {

  var user = Users.getUser();
  console.log('exiting', user);
  Users.logoutUser();
}

var Main = React.createClass({
  render: function(){
    return (
      <div>
        <Nav/>
        <h3>Main</h3>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Main;
