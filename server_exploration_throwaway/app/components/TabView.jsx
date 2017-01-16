var React = require('react');
var UserInventory = require('UserInventory');
var UserList = require('UserList');
var ServerInventory = require('ServerInventory');

var TabView = React.createClass({
  render: function(){
    console.log('tab view', this.props);
    return (
      <div>
        <h3>TabView</h3>
        <UserInventory/>
        <UserList/>
        <ServerInventory/>
      </div>
    );
  }
});

module.exports = TabView;
