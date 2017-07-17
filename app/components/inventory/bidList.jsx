var React = require('react');
import PropTypes from 'prop-types';
let InventoryTable = require('../inventoryTable.jsx');

//TODO: abstract this, too much duplicate behaviour with itemList & listingList
class BidList extends React.Component{
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
                {Header : 'Starting Bid', accessor : 'startingPrice', id : 'startingPrice' },
                {Header : 'Current Bid', accessor : 'price', id : 'price' },
                {Header : 'My Bid', accessor : 'bid', id : 'bid' },
                {Header : 'Status', accessor : 'status', id : 'status' },
                {Header : 'Expires in', accessor : 'expiresIn', id : 'expiresIn' }];
        if(this.props.tags != null && this.props.tags != undefined){
            this.props.tags.map((tag, i)=>{
                columns.push({Header : tag.name, accessor: tag.name});
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
            row['bid'] = this.props.bids[i].amount;
            let expiry = ((new Date(listing.expiry_date)).getTime() - Date.now())/(1000*60*60);
            if(expiry <= 0){ 
                row['expiresIn'] = 'expired';
            }else{
                row['expiresIn'] = expiry + ' hours';
            } 

            let expired = expiry <= 0.0;
            let sold = listing.sold;
            let currentBidder = this.props.bids[i].bidderId === this.props.maxBids[i].bidderId 
            && this.props.bids[i].amount === this.props.maxBids[i].amount;
            if(!expired && !sold){
                if(currentBidder){
                    row['status'] = 'active';
                } else {
                    row['status'] = 'outbid';
                }
                
            } else if(sold){
                if(currentBidder){
                    row['status'] = 'won';
                } else {
                    row['status'] = 'outbid';
                }
            } 

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
             <InventoryTable selectIdNames = {['itemId','status', 'expiresIn']}
                             selectItem = {this.props.selectItem} 
                             values = {this.getValues()} 
                             headers = {this.getHeaders()}/>
         );
    }
}
BidList.propTypes = {
    listings : PropTypes.array.isRequired,
    bids : PropTypes.array.isRequired,
    maxBids : PropTypes.array.isRequired,
    tags : PropTypes.arrayOf(PropTypes.object).isRequired,
    tagValues : PropTypes.arrayOf(PropTypes.object).isRequired,
    selectItem : PropTypes.func.isRequired
};

module.exports = BidList;
