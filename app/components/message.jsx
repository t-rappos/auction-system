
var React = require('react');
//let ServerAPI = require('../api/server.jsx');
//let Message = require('./message.jsx');
import PropTypes from 'prop-types';
let Modal = require('./modal.jsx');

//TODO style the table
const labelStyle = {
};

const contentStyle = {
};

const messageViewTableStyle = {
};

const exitMessageViewButtonStyle = {
    float : 'right'
};

const msgViewContentsStyle = {
    float : 'left'
};

class MessageView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open : false};
    }
    render(){
        return(
            <div style = {msgViewContentsStyle}>
                <table style = {messageViewTableStyle}>
                    <tbody>
                    <tr>
                        <td style = {labelStyle}>Title: </td>
                        <td style = {contentStyle} >
                            <h4>{this.props.title}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Sender: </td>
                        <td style = {contentStyle} >
                            <h5>{this.props.sender}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td style = {labelStyle}>Contents: </td>
                        <td style = {contentStyle} >
                            <p>{this.props.contents}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className = 'button-group'>
                    <button className = 'success button' onClick = {()=>{this.props.forceCloseModal();}}>Reply</button>
                    <button onClick = {()=>{this.props.deleteMessage(this.props.messageId); this.props.forceCloseModal();}} className = 'alert button'>Delete</button>
                </div>
            </div>
        );
    }
}

MessageView.propTypes = {
    messageId : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    sender : PropTypes.string.isRequired,
    contents : PropTypes.string.isRequired,
    deleteMessage : PropTypes.func.isRequired,
    forceCloseModal : PropTypes.func.isRequired
};

const messageButtonStyle = {
    maxWidth : 250,
    display : 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    margin: 0
};

const messageListStyle = {
    maxWidth : 250,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightGrey',
    margin: 0
};


class Message extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open : false, forceClosed : []};
    }

//<button onClick = {()=>{this.props.sendMessage(1, 'test', 'test contents');}}>send test message</button>

     render(){
        
        let messageList = null; 
        if(this.props.messages){
            messageList = this.props.messages.map((msg, i)=>{
                let labelText = msg.read ? msg.title:<strong>{msg.title}</strong>;
                return (
                    <tr>
                        <td>
                            <Modal forceClosed = {this.state.forceClosed[i]}>
                                <div onClick = {()=>{console.log("fc-false"); let fc = this.state.forceClosed; fc[i]=false; this.setState({forceClosed : fc});this.props.setMessageRead(msg.id);}}
                                                className = 'open-modal'
                                                style = { {cursor: 'pointer'} }>{labelText}</div>
                                <MessageView 
                                    forceCloseModal = {()=>{console.log("fc-true");let fc = this.state.forceClosed; fc[i]=true; this.setState({forceClosed : fc});}} 
                                    messageId = {msg.id} deleteMessage = {this.props.deleteMessage} 
                                    title = {msg.title} 
                                    sender = {msg.senderId}  
                                    contents = {msg.content}  
                                />
                                <div className = 'alert button close-modal' style = {exitMessageViewButtonStyle}>x</div>
                            </Modal>
                            
                        </td>
                    </tr>
                );
                
            });
        }

        let composeButton =  <div className='button' 
                    style = {messageButtonStyle}
                >New Message</div>;

        let list = this.state.open && this.props.messages 
            ? <div><table style={messageListStyle}><tbody>{messageList}</tbody></table>{composeButton}</div> 
            : <div></div>;
        
        return (
            <div>
                <div className='button' 
                    style = {messageButtonStyle}
                    onClick={()=>{this.setState({open: !this.state.open});}}
                >
                    ({this.props.messages.length}) Messages
                </div>
                {list}
            </div>
        );
     }
}

Message.propTypes = {
    sendMessage : PropTypes.func.isRequired,
    setMessageRead : PropTypes.func.isRequired,
    deleteMessage : PropTypes.func.isRequired,
    messages : PropTypes.arrayOf(PropTypes.object).isRequired
};


module.exports = Message;