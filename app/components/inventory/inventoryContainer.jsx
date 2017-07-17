
var React = require('react');
let TabContainer = require('../tabContainer.jsx').TabContainer;
let Tab = require('../tabContainer.jsx').Tab;
let ItemContainer = require('./itemContainer.jsx');
let ListingContainer = require('./listingContainer.jsx');
let BidContainer = require('./bidContainer.jsx');
//let SearchContainer = require('./searchContainer.jsx');

class InventoryContainer extends React.Component{
    constructor(props) {
        super(props);
     }

    render(){
        return (
                    <TabContainer>
                        <Tab name= 'Items'>
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
