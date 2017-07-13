var React = require('react');
let ListingInspector = require('../itemInspector/listingInspector.jsx');
let ListingList = require('./listingList.jsx');
var ServerApi = require('../../api/server.jsx');
import PropTypes from 'prop-types';

class ListingContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            maxBids : [],
            listings : [],
            tags : [],
            tagValues : [],
            images : [],
            selectedItemId : null
        };
     }

    selectListing(itemId){
        console.log('selecting item id ',itemId);
        this.setState({selectedItemId : itemId});
    }

    getSelectedItemImage(){
        let url = null;
        if(this.state.selectedItemId != null){
            let imgId = this.getSelectedItem().imageId;
            this.state.images.map((img)=>{
                if(img.id == imgId){
                    url = img.url;
                }
            });
        }
        return url;
    }

    //TODO: refactor all these getSelected... functions
    //maybe return {selectedItem, selectedUrl, selectedListing, selectedNames, selectedValues}
    getSelectedListing(){
        let selectedListing = null;
            if(this.state.selectedItemId != null){
                this.state.listings.map((listing)=>{
                if(listing.item.id == this.state.selectedItemId){
                    selectedListing = listing;
                }
            });
        }
        console.log(selectedListing);
        return selectedListing;
    }

    getSelectedMaxBid(){
        let selectedMaxBid = null;
            if(this.state.selectedItemId != null){
                this.state.listings.map((listing,i)=>{
                if(listing.item.id == this.state.selectedItemId){
                    selectedMaxBid = this.state.maxBids[i];
                }
            });
        }
        console.log(selectedMaxBid);
        return selectedMaxBid;
    }

    getSelectedItem(){
        let selectedItem = null;
            if(this.state.selectedItemId != null){
                this.state.listings.map((listing)=>{
                if(listing.item.id == this.state.selectedItemId){
                    selectedItem = listing.item;
                }
            });
        }
        return selectedItem;
    }

    getSelectedItemTagNamesAndValues(){
        let tagNames = [];
        let tagValues = [];
        this.state.tagValues
        .filter((tv)=>{
            return tv.itemId === this.state.selectedItemId;
        })
        .map((tv)=>{
            tagNames.push(this.state.tags[tv.tagId-1].name);
            tagValues.push(tv.value);
        });
        return [tagNames, tagValues];
    }

    loadData(){
        let request = this.props.showAllListings ? ServerApi.sendViewListingsRequest : ServerApi.sendViewAccountListingsRequest;
        request((res)=>{
            if(res){
                if(res.error){
                    alert('listingContainer error ');
                } else {
                    console.log('res', res);
                    console.log("gathered " + res.listings.length + ' listings ');
                    console.log('listings',res.listings);
                    this.setState({
                        maxBids : res.listingMaxBids,
                        listings : res.listings,
                        tags : res.tags,
                        tagValues : res.tagValues,
                        images : res.images});
                }
            }
        });
    }
    componentDidMount(){
        this.loadData();
    }
    /*    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array */
     render(){
        let selectedTagNameValues = this.getSelectedItemTagNamesAndValues();
        return (
            <div className='row'>
                    <div className='small-6 columns'>
                           <ListingInspector 
                                displayOwnedListings = {!this.props.showAllListings}
                                maxBid = {this.getSelectedMaxBid()}
                                listing = {this.getSelectedListing()}
                                item={this.getSelectedItem()} 
                                url = {this.getSelectedItemImage()} 
                                tagNames = {selectedTagNameValues[0]} 
                                tagValues = {selectedTagNameValues[1]}/>
                    </div>
                    <div className='small-6 columns'>
                           <ListingList 
                                        maxBids = {this.state.maxBids}
                                        listings = {this.state.listings}
                                        tags = {this.state.tags}
                                        tagValues = {this.state.tagValues}
                                        selectItem = {this.selectListing.bind(this)}/>
                    </div>
            </div>
        );
     }
}

ListingContainer.propTypes = {
    showAllListings : PropTypes.bool.isRequired
};

module.exports = ListingContainer;
