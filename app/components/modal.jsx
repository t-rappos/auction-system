var React = require('react');
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Radium from 'radium';
/*Example usage here

                <Modal label = 'test modal' >
                    <button className = "open-modal"> Open Modal </button> <-- drawn outside of modal
                    <button className = "close-modal"> Close modal </button> <-- everything else is drawn inside modal
                </Modal>

use className open-modal to indicate the element that will be drawn by default and when clicked will open the modal
use className close-modal to indicate the element in the modal that will close the modal when clicked


                <Modal label = 'test modal' forceClosed = {this.state.fclose} >
                    <button className = "open-modal"> Open Modal </button> <-- drawn outside of modal
                    <button className = "close-modal"> Close modal </button> <-- everything else is drawn inside modal

                    //for nested close buttons
                    <div>
                      <button onClick = {()=>{this.setState({fclose : true})}}> Close modal </button>
                    </div>

                </Modal>

a modal can also be force closed by setting the forceClosed prop to true
this allows callbacks to be passed to the modal children, these callbacks can alter a value for the modals parent, the parent then can pass
a forceClose prop to the modal  

^^ same for forceOpen prop but opposite
*/

const customStyles = {
  overlay :{
    zIndex : 2,
    background : 'rgba(0,0,0,0.2)'
  },
  content: {
    border: '0px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 5px 5px 5px, rgba(0, 0, 0, 0.05) 0px 0px 5px',
    top: '10vh',
    left: '10vw',
    right: '77vw',
    bottom: '33vh',
    minHeight: '500px',
    minWidth: '250px'
  }
};

class Modal extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      contents : null,
      button : null
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
    let button = null;  //TODO: think about making this a prop e.g. this.props.button = {<button></button>}
    let contents = 
      this.props.children.map((child, i)=>{
        if(child && child.props && child.props.className){
            if(/close-modal/.test(child.props.className)){
              return <div key = {i} onClick = {this.handleCloseModal}>{child}</div>;
            }else if(/open-modal/.test(child.props.className)){
              button = <div key = {i} onClick = {this.handleOpenModal}>{child}</div>;
            }
        } else {
          return child;
        }
      });
    return (
      <div>
        {button}
        <ReactModal 
          style={customStyles}
           isOpen={(this.state.showModal && this.props.forceClosed !== true) || this.props.forceOpen}
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
    label : PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    forceClosed : React.PropTypes.bool,
    forceOpen : React.PropTypes.bool
};

module.exports = Radium(Modal);