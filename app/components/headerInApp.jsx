let React = require('react');
import { browserHistory } from 'react-router';
import Radium from 'radium';
let MessageContainer = require('./message/messageContainer.jsx');
import PropTypes from 'prop-types';
let serverAPI = require('../api/server.jsx');

const topBarStyle = {
  background: 'white'
};

const accountPadding={
  '@media (min-width: 640px)':{
    borderStyle: 'solid',
    borderTopWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '0px',
    borderLeftWidth: '1px',
  },
  '@media (max-width: 640px)':{
    padding: 0
  }
};

const noPaddingStyle = {
  padding : '0px'
};

const imgMarginStyle = {
  marginTop: '3px'
};

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    getHeaderToggleStyle(enabled){
      return {cursor: 'pointer', color: enabled?'black':'rgba(128,128,128,0.5)'};
    }

    render(){
        return (
            <div className = 'top-bar' style = {topBarStyle}>
                <div className = 'top-bar-left' >
                  <ul className="menu" style = {topBarStyle}>
                    <li className ="menu-text" style={{padding:'0px'}}>
                      <div>
                        <i className="fa fa-2x fa-balance-scale" aria-hidden="true" style = {{color:'black'}}/>
                      </div>
                    </li>
                    <li className ="menu-text" >
                      <div>
                       Auction System
                      </div>
                    </li>
                    <li className ="menu-text" style ={accountPadding}>
                      <div style = { this.getHeaderToggleStyle(this.props.accountVisible) } onClick = {()=>{this.props.toggleAccount();}}>
                       Account
                      </div>
                    </li>
                    <li className ="menu-text" >
                      <div style = { this.getHeaderToggleStyle(this.props.inventoryVisible) } onClick = {()=>{this.props.toggleInventory();}}>
                       Inventory
                      </div>
                    </li>
                  </ul>
                </div>
                <div className = 'top-bar-right' >
                  <ul className="menu" style = {topBarStyle}>
                    <li className ="menu-text">
                      <div style = {{cursor: 'pointer'}} onClick = {()=>{
                          serverAPI.sendUserLogoutRequest(()=>{
                            browserHistory.push('#');
                          });
                        }}>
                       Logout
                      </div>
                    </li>
                    <li >
                      <MessageContainer/>
                    </li>
                    <li className ="menu-text" style={{padding:'0px'}}>
                      <a href="https://github.com/t-rappos/auction-system/" style = {noPaddingStyle}>
                        <i style = {imgMarginStyle} className="fa fa-2x fa-github" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
            </div>);
    }
}

Header.propTypes = {
  inventoryVisible : PropTypes.bool.isRequired,
  accountVisible : PropTypes.bool.isRequired,
  toggleInventory : PropTypes.func.isRequired,
  toggleAccount : PropTypes.func.isRequired,
};

module.exports = Radium(Header);


//<img src='./assets/GitHub-Mark-64px.png' alt="" style = {imgMarginStyle}/>