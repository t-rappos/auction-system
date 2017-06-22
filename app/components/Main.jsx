var React = require('react');
var LandingTabContainer = require('./landingTabContainer.jsx');
const appStyle = {

};

const mainWindowStyle = {

};

var Main = React.createClass({

  render: function(){
    return (
      <div ref={node => this.node = node} style={appStyle}>
        <div className='expanded row' style={mainWindowStyle} >
          <LandingTabContainer/>
        </div>
      </div>
    );
  }
});

module.exports = Main;
