let InventoryContainer = require('./inventory/inventoryContainer.jsx');
let AccountContainer = require('./accountContainer.jsx');
let Header = require('./headerInApp.jsx');

var React = require('react');

const appStyle = {
  width: '100%',
	background: 'linear-gradient(45deg, rgb(8, 204, 219) 0%, rgb(23, 121, 186) 100%)',
  height: '70vh',
  paddingTop: '10px',
  boxShadow: 'inset 0px 0px 8px 3px rgba(0, 0, 0, 0.09)'
};

const PageContainer = (props)=>{
    return <div>
                <Header/>
                <div style = {appStyle}>
                    <div className = 'row'>
                        <div className = 'small-6 columns'>
                            <AccountContainer/>
                        </div>

                    </div>
                    <div className = 'row'>
                        <div className = 'small-12 columns'>
                            <InventoryContainer/>
                        </div>
                    </div>
                </div>
            </div>;
};

module.exports = PageContainer;