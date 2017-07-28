let React = require('react');
import { browserHistory } from 'react-router';
let MessageContainer = require('./message/messageContainer.jsx');

const topBarStyle = {
  background: 'white'
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

    render(){
        return (
            <div className = 'top-bar' style = {topBarStyle}>
                <div className = 'top-bar-left' >
                  <ul className="menu" style = {topBarStyle}>
                    <li className ="menu-text" style={{padding:'0px'}}>
                      <div style = { {cursor: 'pointer'} } onClick = {()=>{browserHistory.push('#');}}>
                        <i className="fa fa-2x fa-balance-scale" aria-hidden="true" style = {{color:'black'}}/>
                      </div>
                    </li>
                    <li className ="menu-text" >
                      <div style = { {cursor: 'pointer'} } onClick = {()=>{browserHistory.push('#');}}>
                       Auction System
                      </div>
                    </li>
                  </ul>
                </div>
                <div className = 'top-bar-right' >
                  <ul className="menu" style = {topBarStyle}>
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

module.exports = Header;


//<img src='./assets/GitHub-Mark-64px.png' alt="" style = {imgMarginStyle}/>