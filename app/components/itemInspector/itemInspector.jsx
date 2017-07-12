var React = require('react');
let ItemView = require('./itemView.jsx');
let ItemButtons = require('./itemButtons.jsx');
import PropTypes from 'prop-types';
var ServerApi = require('../../api/server.jsx');

class ItemInspector extends React.Component{
    constructor(props) {
        super(props);
     }

    destroySelectedItem(){
        if(this.props.item){
            ServerApi.sendDestroyItemRequest(this.props.item.id, (res)=>{
                if(res.error == null){
                    alert('Item destroyed successfully!');
                } else {
                    alert('Couldn\'t destroy item!');
                }
            });
        }
    }

    render(){
        let valid = this.props.item;
        return (
            <div>{
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
                    <div>No item selected</div>
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
