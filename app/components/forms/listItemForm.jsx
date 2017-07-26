var React = require('react');
import PropTypes from 'prop-types';
let ToastStore = require('../toast/toastStore.jsx');

class ListItemForm extends React.Component{
    constructor(props) {
        super(props);
     }

    onSubmit(e){
        e.preventDefault();
        let mode = this.radioBid.checked ? 'bid' : (this.radioBuyout.checked?'buyout':'');
        if(mode == ''){
            ToastStore.push('Please select listing mode', 5000, 'warning');
        }
        else{
            this.props.sellItem(mode, 
                            this.price.value,
                            this.selectDuration.value);
        }
        
    }

    render(){
        return (
            <form onSubmit = {this.onSubmit.bind(this)}>
                        <label>Listing Type</label>
                        <label htmlFor="listingTypeBid"><input ref={(input) => this.radioBid = input} type="radio" name="listingType" value="Bid" id="listingTypeBid"/>Bid</label>
                        <label htmlFor='listingTypeBuyout'><input ref={(input) => this.radioBuyout = input} type="radio" name="listingType" value="Buyout" id="listingTypeBuyout"/>Buyout</label>
                        <label>Listing Duration
                            <select ref={(input) => this.selectDuration = input}>
                                <option value="0.03">2 Mins</option>
                                <option value="1">1 Hour</option>
                                <option value="12">1 Day</option>
                                <option value="24">2 Days</option>
                            </select>
                        </label>
                        <label>Starting Price
                            <input ref={(input) => this.price = input} type="number" placeholder="0.05" required = {true} step='any' />
                        </label>
                <div className = 'button-group'>
                    <button className = 'button success' type="submit">Sell</button>
                    <button className = 'button alert'  onClick = {()=>{this.props.forceCloseModal();}}>Cancel</button>
                </div>
            </form>
        );
    }
}

ListItemForm.propTypes = {
    forceCloseModal : PropTypes.func.isRequired,
    sellItem : PropTypes.func.isRequired
};

module.exports = ListItemForm;
