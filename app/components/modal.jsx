var React = require('react');
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

/*Example usage here

                <Modal label = 'test modal' >
                    <button className = "open-modal"> Open Modal </button> <-- drawn outside of modal
                    <button className = "close-modal"> Close modal </button> <-- everything else is drawn inside modal
                </Modal>

use className open-modal to indicate the element that will be drawn by default and when clicked will open the modal
use className close-modal to indicate the element in the modal that will close the modal when clicked
*/

class Modal extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
 
  render () {
    let button = null;
    let contents = this.props.children.map((child, i)=>{
                   if(child && child.props && child.props.className){
                       if(/close-modal/.test(child.props.className)){
                        let clone = React.cloneElement(child, {key : i, onClick : this.handleCloseModal});
                        return clone;
                       }else if(/open-modal/.test(child.props.className)){
                        button = React.cloneElement(child, {key : i, onClick : this.handleOpenModal});
                       }
                   } else {
                    let clone = React.cloneElement(child, {key : i});
                    return clone;
                   }
                });
    return (
      <div>
        {button}
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel={this.props.label}
           onRequestClose={this.handleCloseModal /*this allows esc to work*/}
           >
           
           {contents}
        </ReactModal>
      </div>
    );
  }
}

Modal.propTypes = {
    label : PropTypes.string,
    children: React.PropTypes.node
};

module.exports = Modal;