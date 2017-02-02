var React = require('react');
//var ServerApi = require('ServerAPI');

const appStyle = {

};

const mainWindowStyle = {

};

var Main = React.createClass({

  render: function(){
    return (
      <div ref={node => this.node = node} style={appStyle}>
        <div className='expanded row' style={mainWindowStyle} >
          <h1>Main Window</h1>
        </div>
      </div>
    );
  }
});

module.exports = Main;
