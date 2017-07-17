var React = require('react');
let BidButtons = require('./bidButtons.jsx');
let ItemView = require('./itemView.jsx');
var ServerApi = require('../../api/server.jsx');

import PropTypes from 'prop-types';

class BidInspector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {forceModalClosed : null};
     }

    outbidListing(price){
        ServerApi.sendBidOnListingRequest(this.props.listing.id,price,(res)=>{
            if(res){
                if(res.error){
                    alert('Couldn\'t outbid listing' + res.error);
                } else {
                    alert('Listing re-bid on '+this.props.listing.item.name+' for ' + price);
                }
            }
        });
    }

    render(){
        let minPrice = 0;
        if(this.props && this.props.listing){
            minPrice = ((this.props.maxBid!=null)? this.props.maxBid.amount : this.props.listing.starting_price) + 1;
        }
        
        return (
                this.props.item 
                ?
                    <div>
                        <ItemView
                            description = {this.props.item.description}
                            name = {this.props.item.name}
                            imageUrl = {this.props.url}
                            tagNames = {this.props.tagNames}
                            tagValues = {this.props.tagValues}
                        />
                        <BidButtons listingMinPrice = {minPrice}
                                    bidFunc = {this.outbidListing.bind(this)}
                                    status = {this.props.status}
                                    expired = {this.props.expired}/>
                        
                    </div>
                :
                <div>No listing selected.</div>
        );
    }
}

BidInspector.propTypes = {
    expired : PropTypes.string,
    status : PropTypes.string,
    listing :  PropTypes.object,
    maxBid :  PropTypes.object,
    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array
};

module.exports = BidInspector;
