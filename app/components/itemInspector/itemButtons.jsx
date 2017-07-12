var React = require('react');
import PropTypes from 'prop-types';
let Modal = require('../modal.jsx');
let ListItemFormContainer = require('../forms/listItemFormContainer.jsx');
class ItemButtons extends React.Component{
    constructor(props) {
        super(props);
        this.state = {forceModalClosed : null};
     }

     render(){
        return (
            <div className= 'button-group'>
                <Modal label = 'list item modal' forceClosed = {this.state.forceModalClosed}>
                    <button style = {{'float' : 'left'}} 
                            className = 'button open-modal'
                            onClick = {()=>{this.setState({forceModalClosed : null});}}
                    >Sell</button>
                    <ListItemFormContainer 
                        item = {this.props.item}
                        forceCloseModal = {()=>{this.setState({forceModalClosed : true});}}/>
                    <button className = 'button alert close-modal' 
                            onClick ={()=>{this.setState({forceModalClosed : true});}}
                            style = {{'float' : 'right'}}>x</button>
                </Modal>
                
                <button className = 'button alert' onClick = {this.props.destroySelectedItem}>Destroy</button>
            </div>
        );
    }
}

ItemButtons.propTypes = {
    destroySelectedItem : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
};

module.exports = ItemButtons;
