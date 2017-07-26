var React = require('react');
let BidInspector = require('../itemInspector/bidInspector.jsx');
let BidList = require('./bidList.jsx');
var ServerApi = require('../../api/server.jsx');
//import PropTypes from 'prop-types';


//TODO: abstract this, too much duplicate behaviour with listingContainer
class BidContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bids : [],
            maxBids : [],
            listings : [],
            tags : [],
            tagValues : [],
            images : [],
            selectedItemId : null,
            selectedStatus : '',
            selectedExpired : 0
        };
     }

    selectListing(data){
        this.setState({selectedItemId : data.itemId,
                    selectedStatus:data.status,
                    selectedExpired : data.expiresIn});
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
        ServerApi.sendViewBidsRequest((res)=>{
            if(res){
                if(res.error){
                    alert('listingContainer error ');
                } else {
                    this.setState({
                        bids : res.bids,
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

     render(){
        let selectedTagNameValues = this.getSelectedItemTagNamesAndValues();
        return (
            <div className='row'>
                    <div className='small-6 columns'>
                           <BidInspector 
                                expired = {this.state.selectedExpired + ""}
                                status = {this.state.selectedStatus}
                                maxBid = {this.getSelectedMaxBid()}
                                listing = {this.getSelectedListing()}
                                item={this.getSelectedItem()} 
                                url = {this.getSelectedItemImage()} 
                                tagNames = {selectedTagNameValues[0]} 
                                tagValues = {selectedTagNameValues[1]}/>
                    </div>
                    <div className='small-6 columns'>
                           <BidList bids = {this.state.bids}
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

//BidContainer.propTypes = {
//};

module.exports = BidContainer;
