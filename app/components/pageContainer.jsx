let InventoryContainer = require('./inventory/inventoryContainer.jsx');
let AccountContainer = require('./accountContainer.jsx');
let Header = require('./headerInApp.jsx');
let Flex = require('../flexStyles.js');
let Help = require('./help.jsx');

import Radium from 'radium';

var React = require('react');

const appStyle = {
  width: '100%',
	background: 'linear-gradient(45deg, rgb(8, 204, 219) 0%, rgb(23, 121, 186) 100%)',
  height: '70vh',
  paddingTop: '10px',
  boxShadow: 'inset 0px 0px 8px 3px rgba(0, 0, 0, 0.09)'
};



class PageContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {  accountVisible : false,
                        inventoryVisible : true, 
                        helpVisible : true};

        this.toggleAccount = this.toggleAccount.bind(this);
        this.toggleInventory = this.toggleInventory.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
    }

    toggleAccount(){
        this.setState({accountVisible : !this.state.accountVisible} );
    }

    toggleInventory(){
        this.setState({inventoryVisible : !this.state.inventoryVisible} );
    }

    toggleHelp(){
        this.setState({helpVisible : !this.state.helpVisible} );
    }

    render(){
    return (
        <div>
            <Header accountVisible = {this.state.accountVisible} 
                    inventoryVisible = {this.state.inventoryVisible}
                    helpVisible = {this.state.helpVisible}
                    toggleAccount = {this.toggleAccount}
                    toggleInventory = {this.toggleInventory}
                    toggleHelp = {this.toggleHelp}/>
            <div style = {appStyle}>
                <div style ={Flex.flexContainerStyle}>
                    
                    {this.state.helpVisible?
                        <div style = {Flex.flexChildPanelStyle}>
                            <Help/>
                        </div>
                        :<div></div>}
                    
                    {this.state.accountVisible?
                        <div style = {Flex.flexChildPanelStyle}>
                            <AccountContainer/>
                        </div>
                        :<div></div>}

                    {this.state.inventoryVisible?
                        <div style = {Flex.flexChildPanelStyle}>
                            <InventoryContainer/>
                        </div>
                        :<div></div>}

                </div>
            </div>
        </div>);
    }
}

module.exports = Radium(PageContainer);