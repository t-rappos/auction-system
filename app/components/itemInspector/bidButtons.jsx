var React = require('react');
import PropTypes from 'prop-types';

class BidButtons extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();
        if(this.price.value < this.props.listingMinPrice){
            alert("Cannot bid less than the listed price!");
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
        <div>
            <form onSubmit={this.onSubmit.bind(this)}>
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
