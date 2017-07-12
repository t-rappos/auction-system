var React = require('react');
import PropTypes from 'prop-types';

class ListingButtons extends React.Component{
    constructor(props) {
        super(props);
     }
    
    render(){
        return <button className = 'button alert' onClick = {this.props.cancelListing}>Cancel Listing</button>;
    }
    
}

ListingButtons.propTypes = {
    cancelListing : PropTypes.func.isRequired
};

module.exports = ListingButtons;
