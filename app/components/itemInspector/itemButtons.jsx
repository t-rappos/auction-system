var React = require('react');
import PropTypes from 'prop-types';
let Modal = require('../modal.jsx');
let ListItemFormContainer = require('../forms/listItemFormContainer.jsx');
let ButtonStyle = require('./buttonStyle.js');

class ItemButtons extends React.Component{
    constructor(props) {
        super(props);
        this.state = {forceModalClosed : null};
     }

     render(){
        return (
            <div className= 'button-group' style = {ButtonStyle.style}>
                <Modal label = 'list item modal' forceClosed = {this.state.forceModalClosed}>
                    <button style = {ButtonStyle.leftStyle} 
                            className = 'button open-modal'
                            onClick = {()=>{this.setState({forceModalClosed : null});}}
                    >Sell</button>
                    <ListItemFormContainer 
                        item = {this.props.item}
                        forceCloseModal = {()=>{this.setState({forceModalClosed : true});}}/>
                </Modal>
                
                <button style = {ButtonStyle.rightStyle} className = 'button alert' onClick = {this.props.destroySelectedItem}>Destroy</button>
            </div>
        );
    }
}

ItemButtons.propTypes = {
    destroySelectedItem : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
};

module.exports = ItemButtons;
