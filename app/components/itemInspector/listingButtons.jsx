var React = require('react');
import PropTypes from 'prop-types';
let ButtonStyle = require('./buttonStyle.js');

class ListingButtons extends React.Component{
    constructor(props) {
        super(props);
     }
    
    render(){
        return <div style = {ButtonStyle.style}><button className = 'button alert' onClick = {this.props.cancelListing}>Cancel Listing</button></div>;
    }
    
}

ListingButtons.propTypes = {
    cancelListing : PropTypes.func.isRequired
};

module.exports = ListingButtons;
