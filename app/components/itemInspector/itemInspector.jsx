var React = require('react');
let ItemView = require('./itemView.jsx');
let ItemButtons = require('./itemButtons.jsx');
import PropTypes from 'prop-types';
var ServerApi = require('../../api/server.jsx');
let ToastStore = require('../toast/toastStore.jsx');
let store = require('../../redux/wrapper.jsx').store;
let actions = require('../../redux/actions.jsx');

class ItemInspector extends React.Component{
    constructor(props) {
        super(props);
     }

    destroySelectedItem(){
        let toDelete = confirm('Are you sure you want to delete this item?');
        if(toDelete && this.props.item){
            ServerApi.sendDestroyItemRequest(this.props.item.id, (res)=>{
                if(res.error == null){
                    ToastStore.push('Item destroyed successfully!', 5000, 'success');
                    store.dispatch(actions.refreshItems());
                } else {
                    ToastStore.push('Couldn\'t destroy item!', 5000, 'error');
                }
            });
        }
    }
//style = {{maxWidth : '70vw', width:'200px'}}
//<div style={{textAlign: 'center'}}>No item selected</div>
    render(){
        let valid = this.props.item;
        return (
            <div >{
                valid ?
                    <div>
                        <ItemView
                            description = {this.props.item.description}
                            name = {this.props.item.name}
                            imageUrl = {this.props.url}
                            tagNames = {this.props.tagNames}
                            tagValues = {this.props.tagValues}
                        />
                        <ItemButtons 
                            item = {this.props.item}
                            destroySelectedItem = {this.destroySelectedItem.bind(this)}
                        />
                    </div>
                :
                    false
                }
                
            </div>
        );
    }
}

ItemInspector.propTypes = {
    item : PropTypes.object,
    url : PropTypes.string,
    tagNames : PropTypes.array,
    tagValues : PropTypes.array
};

module.exports = ItemInspector;
