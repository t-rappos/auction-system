var React = require('react');
let ListingButtons = require('./listingButtons.jsx');
let SearchButtons = require('./searchButtons.jsx');
let ItemView = require('./itemView.jsx');
var ServerApi = require('../../api/server.jsx');

import PropTypes from 'prop-types';

class ListingInspector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {forceModalClosed : null};
     }

    cancelSelectedListing(){
        ServerApi.sendCancelListingRequest(this.props.listing.id,(res)=>{
            if(res){
                if(res.error){
                    alert('Couldnt cancel listing' + res.error);
                } else {
                    alert('listing successfully cancelled');
                }
            }
        });
    }

    purchaseListing(price){
        alert('attempting to purchase listing '+this.props.listing.item.name+' for ' + price);
        if(this.props.listing.type === 'bid'){
            ServerApi.sendBidOnListingRequest(this.props.listing.id,price,(res)=>{
                if(res){
                    if(res.error){
                        alert('Couldn\'t purchase listing' + res.error);
                    } else {
                        alert('Listing purchased ! '+this.props.listing.item.name+' for ' + price);
                    }
                }
            });
        } else {
            ServerApi.sendBuyoutListingRequest(this.props.listing.id,(res)=>{
                if(res){
                    if(res.error){
                        alert('Couldn\'t purchase listing' + res.error);
                    } else {
                        alert('Listing purchased ! '+this.props.listing.item.name+' for ' + price);
                    }
                }
            });
        }
        
        
    }

    render(){
        let minPrice = 0;
        if(this.props && this.props.listing){
            minPrice = ((this.props.maxBid!=null)? this.props.maxBid.amount : this.props.listing.starting_price) + 1;
            console.log('minPrice', minPrice);
        }
        console.log(this);
        
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

                        {this.props.displayOwnedListings 
                        ?
                            <ListingButtons cancelListing = {this.cancelSelectedListing.bind(this)}/>
                            :
                            <SearchButtons listingTypeIsBid = {this.props.listing.type === 'bid'}
                                            listingMinPrice = {minPrice}
                                            bidFunc = {this.purchaseListing.bind(this)}/>}
                        
                    </div>
                :
                <div>No listing selected.</div>
        );
    }
}

ListingInspector.propTypes = {
    displayOwnedListings : PropTypes.bool.isRequired,
    listing :  PropTypes.object,
    maxBid :  PropTypes.object,
    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array
};

module.exports = ListingInspector;
