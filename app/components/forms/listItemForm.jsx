var React = require('react');
import PropTypes from 'prop-types';
let ToastStore = require('../toast/toastStore.jsx');
let ButtonStyle = require('../itemInspector/buttonStyle.js');
import Radium from 'radium';

const headingStyle = {
    padding: '10px 10px 20px',
    textAlign: 'center'
};

class ListItemForm extends React.Component{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
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
            <div>
                <div style = {headingStyle}>List item for sale</div>
            <form onSubmit = {this.onSubmit}>
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
                <div className = 'button-group' style = {{marginTop: '30px'}}>
                    <button style = {ButtonStyle.leftStyle} className = 'button success' type="submit">Sell</button>
                    <button style = {[ButtonStyle.rightStyle, {width: '49%'}]} className = 'button alert'  onClick = {()=>{this.props.forceCloseModal();}}>Cancel</button>
                </div>
            </form>
            </div>
        );
    }
}

ListItemForm.propTypes = {
    forceCloseModal : PropTypes.func.isRequired,
    sellItem : PropTypes.func.isRequired
};

module.exports = Radium(ListItemForm);
