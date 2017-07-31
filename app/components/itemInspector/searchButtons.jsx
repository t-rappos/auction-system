var React = require('react');
import PropTypes from 'prop-types';
let ToastStore = require('../toast/toastStore.jsx');
let ButtonStyle = require('./buttonStyle.js');

class SearchButtons extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();
        if(this.props.listingTypeIsBid  && this.price.value < this.props.listingMinPrice){
            ToastStore.push("Cannot bid less than the listed price!", 5000, 'error');
            return;
        }
        this.props.bidFunc(this.props.listingTypeIsBid ? this.price.value : this.props.listingMinPrice);
    }

    render(){
        let bidLabel = this.props.listingTypeIsBid ? 'Listing minimum bid' : 'Price';
        let buttonText = this.props.listingTypeIsBid ? 'Place bid' : 'Purchase';
        return (
        <div style = {ButtonStyle.style}>
            <form onSubmit={this.onSubmit.bind(this)}>
                <label> {bidLabel}
                    {this.props.listingTypeIsBid 
                        ? <input ref = {(input)=>{this.price = input;}} 
                            type='number'
                            step = 'any'
                            placeholder = {this.props.listingMinPrice}
                            disabled = {!this.props.listingTypeIsBid}
                            required=  {true}
                            />
                        :<h4>{this.props.listingMinPrice}</h4>}
                </label>
                <button type='submit' className='button success'>{buttonText}</button>
            </form>
        </div>);
    }
}

SearchButtons.propTypes = {
    listingTypeIsBid : PropTypes.bool.isRequired,
    listingMinPrice : PropTypes.number.isRequired,
    bidFunc : PropTypes.func.isRequired //bidFunc(price)
};

module.exports = SearchButtons;
