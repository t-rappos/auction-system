var React = require('react');
var {Link, IndexLink} = require('react-router');
var Redux = require('Redux');
var Users = require('Users');


var Nav = React.createClass({


  componentWillUnmount: function()
  {
    //console.log(Redux.configure().getState());
    console.log('Nav:ComponentWillMount: logout');
    //Users.logoutUser();
  },

  render: function(){




    return (
      <div>
        <h3>Nav</h3>
          <IndexLink to="/" testProp = 'dsafsad' params={{ testvalue: "hello" }} activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</IndexLink>
          <Link to="/tabView" testProp = 'dsafsad'  params={{ testvalue: "hello" }}  activeClassName="active" activeStyle={{fontWeight: 'bold'}}>View</Link>
      </div>
    );
  }
});

module.exports = Nav;
