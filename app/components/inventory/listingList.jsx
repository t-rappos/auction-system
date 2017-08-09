var React = require('react');
import PropTypes from 'prop-types';
let InventoryTable = require('../inventoryTable.jsx');
let HeaderChecker = require('./headerChecker.jsx');

class ListingList extends React.Component{
    constructor(props) {
        super(props);
     }
    getHeaders(){
        let nameCellRenderer = row=> (
            <div style = { {cursor: 'pointer'} } >
                {row.value}
            </div>
        );
        let columns = [{Header : 'name', accessor : 'name', id : 'name', Cell : nameCellRenderer },
                {Header : 'itemId', accessor : 'itemId', id : 'itemId' },
                {Header : 'listingId', accessor : 'listingId', id : 'listingId' },
                {Header : 'Starting price', accessor : 'startingPrice', id : 'startingPrice' },
                {Header : 'price', accessor : 'price', id : 'price' },
                {Header : 'Expires in', accessor : 'expiresIn', id : 'expiresIn' }];

        let tagIds = HeaderChecker.sanityCheckHeaders(this.props.tagValues);
        if(this.props.tags != null && this.props.tags != undefined){
            this.props.tags.map((tag, i)=>{
                if(HeaderChecker.checkTagNameIsUsed(tagIds,tag)){
                    columns.push({Header : tag.name, accessor: tag.name});
                }
            });
        }
        return columns;
    }
    getValues(){
        let data = [];
        this.props.listings.map((listing,i)=>{
            let row = {};
            row['name'] = listing.item.name;
            row['itemId'] = listing.item.id;
            row['listingId'] = listing.id;
            row['startingPrice'] = listing.starting_price;
            row['price'] = (this.props.maxBids && this.props.maxBids[i])?this.props.maxBids[i].amount:listing.starting_price;
            row['expiresIn'] = ((new Date(listing.expiry_date)).getTime() - Date.now())/(1000*60*60) + ' hours';
            this.props.tagValues
                    .filter((tv)=>{return tv.itemId === listing.item.id;})
                    .map((tv)=>{
                        row[this.props.tags[tv.tagId-1].name] = tv.value;
                    });
            data.push(row);
        });
        return data;
    }
    render(){
         return (
             <InventoryTable 
             selectItem = {this.props.selectItem} 
             selectIdNames = {['itemId']}
             values = {this.getValues()} headers = {this.getHeaders()}/>
         );
    }
}
ListingList.propTypes = {
    listings : PropTypes.array.isRequired,
    maxBids : PropTypes.array.isRequired,
    tags : PropTypes.arrayOf(PropTypes.object).isRequired,
    tagValues : PropTypes.arrayOf(PropTypes.object).isRequired,
    selectItem : PropTypes.func.isRequired
};

module.exports = ListingList;
