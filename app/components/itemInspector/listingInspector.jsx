var React = require('react');
let ListingButtons = require('./listingButtons.jsx');
let ItemView = require('./itemView.jsx');


import PropTypes from 'prop-types';

class ListingInspector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {forceModalClosed : null};
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
                    <ListingButtons/>
                    </div>
                :
                <div>No listing selected.</div>
        );
    }
}

ListingInspector.propTypes = {
    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array
};

module.exports = ListingInspector;
