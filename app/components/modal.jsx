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


                <Modal label = 'test modal' forceClose = {this.state.fclose} >
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
*/

class Modal extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      onClick : ()=>{},
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
 
  componentWillMount(){
    let button = null;
    let contents = this.props.children.map((child, i)=>{
                      if(child && child.props && child.props.className){
                          if(/close-modal/.test(child.props.className)){
                            let clone = React.cloneElement(child, {key : i, onClick : this.handleCloseModal});
                            return clone;
                          }else if(/open-modal/.test(child.props.className)){
                             //so we append (instead of replace) the open button onClick
                            button = React.cloneElement(child, {key : i, onClick : ()=>{this.state.onClick();  this.handleOpenModal();}});
                            this.setState({onClick : child.props.onClick, button : button});
                          }
                      } else {
                        let clone = React.cloneElement(child, {key : i});
                        return clone;
                      }
                    });
    this.setState({contents : contents});
  }

  render () {
    return (
      <div>
        {this.state.button}
        <ReactModal 
           isOpen={this.state.showModal && this.props.forceClosed !== true}
           contentLabel={this.props.label}
           onRequestClose={this.handleCloseModal /*this allows esc to work*/}
           >
           
           {this.state.contents}
        </ReactModal>
      </div>
    );
  }
}

Modal.propTypes = {
    label : PropTypes.string,
    children: React.PropTypes.node,
    forceClosed : React.PropTypes.bool 
};

module.exports = Modal;