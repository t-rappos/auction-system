var React = require('react');
let ListingInspector = require('../itemInspector/listingInspector.jsx');
let ListingList = require('./listingList.jsx');
var ServerApi = require('../../api/server.jsx');
let store = require('../../redux/wrapper.jsx').store;
import PropTypes from 'prop-types';

class SearchForm extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <form onSubmit = {(e)=>{e.preventDefault(); this.props.submitFn(this.input.value);}}>
                <label> Search
                    <input type='text' ref = {(input)=>{this.input = input;}} placeholder='enter search text here'/>
                    <button type='submit' className = 'button succes'>Search</button>
                </label>
            </form>
        );
    }
}

SearchForm.propTypes = {
    submitFn : PropTypes.func.isRequired
};


class ListingContainer extends React.Component{
    constructor(props) {
        super(props);
        this.events = [];
        this.state = {
            maxBids : [],
            listings : [],
            tags : [],
            tagValues : [],
            images : [],
            selectedItemId : null
        };
     }

    selectListing(data){
        this.setState({selectedItemId : data.itemId});
    }

    getSelectedItemImage(){
        let url = null;
        if(this.state.selectedItemId != null){
            let selectedItem =this.getSelectedItem();
            if(selectedItem=== null){return null;}
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

    loadData(searchCommand){
        let request = this.props.showAllListings ? ServerApi.sendViewListingsRequest : ServerApi.sendViewAccountListingsRequest;
        request(searchCommand, (res)=>{
            if(res){
                if(res.error){
                    alert('listingContainer error ');
                } else {
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
        this.unsubscribe = store.subscribe(()=>{
            let state = store.getState();
            let count = state.refreshItemReducer ? state.refreshItemReducer.length : 0;
            if(count > this.events.length){
                this.events = state.refreshItemReducer;
                this.loadData();
            }
       });
    }
    componentWillUnmount() {
        this.unsubscribe();
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
                            <SearchForm submitFn = {(inp)=>{this.loadData(inp);}}/>
                    </div>
            </div>
        );
     }
}

ListingContainer.propTypes = {
    showAllListings : PropTypes.bool.isRequired
};

module.exports = ListingContainer;
