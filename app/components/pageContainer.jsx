let InventoryContainer = require('./inventory/inventoryContainer.jsx');
let MessageContainer = require('./message/messageContainer.jsx');
let AccountContainer = require('./accountContainer.jsx');


var React = require('react');

const PageContainer = (props)=>{
    return <div>
                <div className = 'row'>
                    <div className = 'small-6 columns'>
                        <AccountContainer/>
                    </div>
                    <div className = 'small-6 columns'>
                        <MessageContainer/>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'small-12 columns'>
                        <InventoryContainer/>
                    </div>
                </div>
            </div>;
};

module.exports = PageContainer;