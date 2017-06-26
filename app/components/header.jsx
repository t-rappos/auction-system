let React = require('react');
import { browserHistory } from 'react-router';

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className = 'top-bar'>
                <div className = 'top-bar-left'>
                  <ul className="dropdown menu" data-dropdown-menu>
                    <div className ="menu-text" ><div style = { {cursor: 'pointer'} } onClick = {()=>{browserHistory.push('#');}}>Auction System App!</div></div>
                  </ul>
                </div>
                <div className = 'top-bar-right'>
                  <ul className="menu">
                    <li>By Thomas Rappos </li>
                    <li><a href="https://github.com/t-rappos/auction-system/">See Github</a></li>
                  </ul>
                </div>
            </div>);
    }
}

module.exports = Header;


