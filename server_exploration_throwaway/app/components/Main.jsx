var React = require('react');
var Nav = require('Nav');

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
