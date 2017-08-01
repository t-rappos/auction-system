var React = require('react');
import PropTypes from 'prop-types';
let ListItemForm = require('./listItemForm');
var ServerApi = require('../../api/server.jsx');
let ToastStore = require('../toast/toastStore.jsx');
let store = require('../../redux/wrapper.jsx').store;
let actions = require('../../redux/actions.jsx');

class ListItemFormContainer extends React.Component{
    constructor(props) {
        super(props);
        this.sellItem = this.sellItem.bind(this);
     }
    sellItem(type, amount, duration){
        if(this.props.item){
            let request = (type=='bid')?ServerApi.sendListItemBidRequest:ServerApi.sendListItemBuyoutRequest;
            request(this.props.item.id, amount, duration*1000*60*60, (res)=>{
                if(res){
                    if(res.error){
                        ToastStore.push('Error selling item', 5000, 'error');
                    } else {
                        ToastStore.push('Created '+type+' listing for ' + this.props.item.name + ' for ' + amount , 5000, 'success');
                        store.dispatch(actions.refreshItems());
                        this.props.forceCloseModal();
                    }
                }
            });
        }
    }
    onSubmit(e){
        e.preventDefault();
    }
    render(){
        return (
            <ListItemForm 
                forceCloseModal = {this.props.forceCloseModal}
                sellItem = {this.sellItem}/>
        );
    }
}

ListItemFormContainer.propTypes = {
    forceCloseModal : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
};

module.exports = ListItemFormContainer;
