var React = require('react');
import PropTypes from 'prop-types';
let ListItemForm = require('./listItemForm');
var ServerApi = require('../../api/server.jsx');

class ListItemFormContainer extends React.Component{
    constructor(props) {
        super(props);
     }
    sellItem(type, amount, duration){
        console.log(type + ' ' + amount + ' ' + duration);
        if(this.props.item){
            let request = (type=='bid')?ServerApi.sendListItemBidRequest:ServerApi.sendListItemBuyoutRequest;
            request(this.props.item.id, amount, duration*1000*60*60, (res)=>{
                if(res){
                    if(res.error){
                        alert('Error selling item' + res.error);
                    } else {
                        alert('Created '+type+' listing for ' + this.props.item.name + ' for ' + amount );
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
                sellItem = {this.sellItem.bind(this)}/>
        );
    }
}

ListItemFormContainer.propTypes = {
    forceCloseModal : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
};

module.exports = ListItemFormContainer;
