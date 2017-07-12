var React = require('react');
let ListingButtons = require('./listingButtons.jsx');
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

    render(){
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
                    <ListingButtons cancelListing = {this.cancelSelectedListing.bind(this)}/>
                    </div>
                :
                <div>No listing selected.</div>
        );
    }
}

ListingInspector.propTypes = {
    listing :  PropTypes.object,
    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array
};

module.exports = ListingInspector;
