
var React = require('react');
let TabContainer = require('../tabContainer.jsx').TabContainer;
let Tab = require('../tabContainer.jsx').Tab;
let ItemContainer = require('./itemContainer.jsx');
let ListingContainer = require('./listingContainer.jsx');
let BidContainer = require('./bidContainer.jsx');

class InventoryContainer extends React.Component{
    constructor(props) {
        super(props);
     }
     
    render(){

        return (
                    <TabContainer containerStyle={{margin : '0px'}}
                        contentStyle = {{margin : '0px', boxShadow: '0px -6px 10px 0px rgba(0, 0, 0, 0.05)'}}>
                        <Tab name = 'My Items'>
                             <ItemContainer/>
                        </Tab>
                        <Tab name = 'My Listings'>
                            <ListingContainer showAllListings = {false}/>
                        </Tab>
                        <Tab name = 'My Bids'>
                            <BidContainer/>
                        </Tab>
                        <Tab name = 'Search All Listings'>
                            <ListingContainer showAllListings = {true}/>
                        </Tab>

                    </TabContainer>
        );
    }
}

module.exports = InventoryContainer;
