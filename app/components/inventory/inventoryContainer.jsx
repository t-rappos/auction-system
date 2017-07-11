
var React = require('react');
let TabContainer = require('../tabContainer.jsx').TabContainer;
let Tab = require('../tabContainer.jsx').Tab;
let ItemContainer = require('./itemContainer.jsx');
let ListingContainer = require('./listingContainer.jsx');
let SearchContainer = require('./searchContainer.jsx');

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
                        <Tab name = 'Listed Items'>
                            <ListingContainer/>
                        </Tab>
                        <Tab name = 'Search All Listings'>
                            <SearchContainer/>
                        </Tab>
                    </TabContainer>
        );
    }
}

module.exports = InventoryContainer;