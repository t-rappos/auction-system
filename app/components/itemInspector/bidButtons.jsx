var React = require('react');
import PropTypes from 'prop-types';
let ToastStore = require('../toast/toastStore.jsx');
let ButtonStyle = require('./buttonStyle.js');
class BidButtons extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        if(this.price.value < this.props.listingMinPrice){
            ToastStore.push("Cannot bid less than the listed price!", 5000, 'warning');
            return;
        }
        this.props.bidFunc(this.price.value);
    }

    render(){
        let enabled = this.props.status  
            && this.props.status === 'outbid' 
            && this.props.expired != 'expired';

        let bidLabel = 'Place counter bid';
        let buttonText = 'Bid';

        return (enabled)?(
        <div style = {ButtonStyle.style}>
            <form onSubmit={this.onSubmit}>
                <label> {bidLabel}
                        <input ref = {(input)=>{this.price = input;}} 
                            type='number'
                            step = 'any'
                            placeholder = {this.props.listingMinPrice}
                            required=  {true}
                            />
                </label>
                <button type='submit' className='button success'>{buttonText}</button>
            </form>
        </div>):false;
    }
}

BidButtons.propTypes = {
    status : PropTypes.string.isRequired,
    expired : PropTypes.string.isRequired,
    listingMinPrice : PropTypes.number.isRequired,
    bidFunc : PropTypes.func.isRequired 
};

module.exports = BidButtons;
