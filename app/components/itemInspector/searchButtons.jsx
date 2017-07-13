var React = require('react');
import PropTypes from 'prop-types';

class SearchButtons extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();
        this.props.bidFunc(this.price.value);
    }

    componentDidMount(){

    }

    render(){
        console.log(this.props.listingMinPrice);
        let bidLabel = this.props.listingTypeIsBid ? 'Listing minimum bid' : 'Price';
        let buttonText = this.props.listingTypeIsBid ? 'Place bid' : 'Purchase';
        return (
        <div>
            <form onSubmit={this.onSubmit.bind(this)}>
                <label> {bidLabel}
                    <input ref = {(input)=>{this.price = input;}} 
                            type='number'
                            step = 'any'
                            placeholder = {this.props.listingMinPrice}
                            disabled = {!this.props.listingTypeIsBid}
                            required=  {true}
                            />
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
