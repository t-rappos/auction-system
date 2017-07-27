let React = require('react');
import { browserHistory } from 'react-router';

const topBarStyle = {
  background: 'white'
};

const noPaddingStyle = {
  padding : '0px'
};

const imgMarginStyle = {
  marginTop: '2px',
  width: '32px'
};

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className = 'top-bar' style = {topBarStyle}>
                <div className = 'top-bar-left' >
                  <ul className="dropdown menu" data-dropdown-menu style = {topBarStyle}>
                    <li className ="menu-text" >
                      <div style = { {cursor: 'pointer'} } onClick = {()=>{browserHistory.push('#');}}>
                        Auction System
                      </div>
                    </li>
                  </ul>
                </div>
                <div className = 'top-bar-right' >
                  <ul className="menu" style = {topBarStyle}>
                    <li>
                      <a href="https://github.com/t-rappos/auction-system/" style = {noPaddingStyle}>
                        <img src='./assets/GitHub-Mark-64px.png' alt="" style = {imgMarginStyle}/>
                      </a>
                    </li>
                  </ul>
                </div>
            </div>);
    }
}

module.exports = Header;


