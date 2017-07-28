var React = require('react');
//var TabContainer = require('./tabContainer.jsx').TabContainer;
//var Tab = require('./tabContainer.jsx').Tab;
//var RegisterForm = require('./registerForm.jsx');
var LoginForm = require('./LoginForm.jsx');
var RegisterForm = require('./RegisterForm.jsx');
let Header = require('./header.jsx');

import PropTypes from 'prop-types';

const appStyle = {
  width: '100%',
	background: 'linear-gradient(45deg, rgb(8, 204, 219) 0%, rgb(23, 121, 186) 100%)',
  height: '70vh',
  paddingTop: '10px',
  boxShadow: 'inset 0px 0px 8px 3px rgba(0, 0, 0, 0.09)'
};

const mainWindowStyle = {
	width: '70%',
	maxWidth: '350px',
	minWwidth: '200px'
};

const imageStyle={
    width: '22vh',
    margin:' 3vh auto',
    display:' table',
    minWidth: '103px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 8px 3px inset',
    borderRadius: '5px',
    textAlign: 'center',
    color: 'white',
    textShadow: '0 0px 7px rgba(0, 0, 0, 0.2)',
    padding:' 10px',
    paddingRight: '4px'
};

class LoginContainer extends React.Component{

  render(){

    let form = this.props.route.mode==='login'?<LoginForm/> : <RegisterForm/>;
    return (
      <div>
        <Header/>
        <div ref={node => this.node = node} style={appStyle}>
          <i className="fa fa-5x fa-balance-scale" aria-hidden="true" style = {imageStyle}/>
          <div className='expanded row' style={mainWindowStyle} >
            {form}
          </div>
        </div>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  route : PropTypes.object
};
module.exports = LoginContainer;

/*          <TabContainer>
            <Tab name = 'Login'><LoginForm/></Tab>
            <Tab name = 'Register'><RegisterForm/></Tab>
          </TabContainer> */