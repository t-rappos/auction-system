var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function(){
    return (
      <div>
        <h3>Nav</h3>
          <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</IndexLink>
          <Link to="/tabView" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>View</Link>
      </div>
    );
  }
});

module.exports = Nav;
