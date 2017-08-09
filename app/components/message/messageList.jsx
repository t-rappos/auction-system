import Radium from 'radium';
import PropTypes from 'prop-types';

var React = require('react');
let MessageView = require('./messageView.jsx');
let Modal = require('../modal.jsx');
let MessageForm = require('./messageForm.jsx');

const exitMessageViewButtonStyle = {
    float : 'right'
};

const messageButtonStyle = {
    display : 'flex',
    margin: 0, 
    cursor: 'pointer'
};

const messageListStyle = {
    margin: 0,
    maxWidth : '250px'
};

const notificationLabelStyle = {    
    borderRadius: '30px',
    background: 'rgb(47, 148, 236)',
    position: 'relative',
    left: '-27.6px',
    top: '13px',
    cursor: 'pointer'
};

const notificationAlertLabelStyle = {    
    borderRadius: '30px',
    background: '#3adb76',
    position: 'relative',
    left: '-27.6px',
    top: '13px',
    cursor: 'pointer'
};

const messageLabelStyle = {
    cursor: 'pointer',
    maxWidth : '225px',
    overflow : 'hidden'
};

class MessageList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open : false, 
                        forceClosed : [], //is message view open for specific message
                        composeForceClosed : true,
                        composeForceOpen : false,
                        replyTitle : '',
                        replyContents: '',
                        replyRecipient : ''
                    };
        this.replyCallback = this.replyCallback.bind(this);
    }

    replyCallback(messageId){
        let index = this.props.messages.findIndex((msg)=>{return msg.id == messageId;});
        if(index != -1){
            this.setState({
                        replyTitle : this.props.messages[index].title,
                        replyContents: this.props.messages[index].content,
                        replyRecipient : this.props.messages[index].senderName,
                        composeForceClosed : false, 
                        composeForceOpen : true});
        }
    }

    renderComposeButton(){
        let composeModal =  <div>
                                <Modal label = 'compose modal' 
                                    forceOpen = {this.state.composeForceOpen}
                                    forceClosed = {this.state.composeForceClosed}> 
                                    <div 
                                        onClick={()=>{
                                            this.setState({
                                                replyTitle : '',
                                                replyContents: '',
                                                replyRecipient : '',
                                                composeForceClosed : false
                                            });
                                        }} 
                                        className='button open-modal' 
                                        style = {messageButtonStyle}
                                    >
                                    New Message</div>
                                    <MessageForm 
                                            getAccountId = {this.props.getAccountId}
                                            sendMessage = {this.props.sendMessage}
                                            title = {this.state.replyTitle} 
                                            sender = {this.state.replyRecipient}  
                                            contents = {this.state.replyContents}  
                                            forceCloseModal = {()=>{this.setState({composeForceOpen : false, composeForceClosed : true});}}/>
                                    <div className = 'alert button close-modal' 
                                        style = {exitMessageViewButtonStyle}
                                        onClick={()=>{this.setState({composeForceOpen : false});}}>x</div>
                                </Modal>
                            </div>;
        return composeModal;
    }

    renderMessageList(){
        let messageList = null; 
        if(this.props.messages){
            messageList = this.props.messages.map((msg, i)=>{
                let msgTitle = msg.title == '' ? '(untitled)' : msg.title;
                let labelText = msg.read ? msgTitle:<strong>{msgTitle}</strong>;
                return (
                    <tr key = {i}>
                        <td>
                            <Modal label = 'view modal' forceClosed = {this.state.forceClosed[i]}>
                                <div onClick = {
                                        ()=>{
                                            let fc = this.state.forceClosed; 
                                            fc[i]=false; 
                                            this.setState({forceClosed : fc});
                                            this.props.setMessageRead(msg.id);
                                        }}
                                    className = 'open-modal'
                                    style = {messageLabelStyle}>{labelText}</div>
                                <MessageView 
                                    replyCallback = {this.replyCallback}
                                    forceCloseModal = {
                                        ()=>{
                                            let fc = this.state.forceClosed; 
                                            fc[i]=true; 
                                            this.setState({forceClosed : fc});
                                        }} 
                                    messageId = {msg.id} deleteMessage = {this.props.deleteMessage} 
                                    title = {msg.title} 
                                    sender = {msg.senderName}  
                                    contents = {msg.content}  
                                />
                                <div className = 'alert button close-modal' style = {exitMessageViewButtonStyle}>x</div>
                            </Modal>
                            
                        </td>
                    </tr>
                );
                
            });
        }
        return messageList;
    }

    render(){
        let unreadMessages = (this.props.messages?this.props.messages.filter((msg)=>{return msg.read == false;}):[]);
        let unreadCount = unreadMessages.length;
        let messageList = this.renderMessageList();
        let composeModal =  this.renderComposeButton();

        let relStyle = {position: 'relative', top: '20px'};
        let absStyle = {
            position: 'absolute',
            background: 'white',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 8px 3px',
            zIndex: 1,
            '@media (min-width: 640px)':{
                left: '-160px'
            }
        };

        let list = (this.state.open && this.props.messages)
            ? 
            <div style = {relStyle}>
                <div style = {absStyle}>
                        <table style={messageListStyle}>
                            <tbody>
                                {messageList}
                            </tbody>
                        </table>
                        {composeModal}
                </div>
            </div> 
            : 
            <div></div>;
        
        let labelStyle = (unreadCount > 0) ? notificationAlertLabelStyle : notificationLabelStyle;
        let readLabel = <span className = 'label round'  style ={labelStyle}>{this.props.messages.length}</span>;

        return (
            <div>
                <div style = {messageButtonStyle} onClick={()=>{this.setState({open: !this.state.open});}}>
                    <i  className={this.state.open ? 'fa fa-2x fa-envelope-open' : "fa fa-2x fa-envelope"} 
                        aria-hidden="true"
                        style = {this.state.open ? {position: 'relative',bottom: '2px'}: {} }>
                    </i>
                    <span style={{width:'100%'}}>
                           <span style={{float:'left'}}>{readLabel}</span>
                    </span>
                </div>
                {list}
            </div>
        );
     }
}

MessageList.propTypes = {
    sendMessage : PropTypes.func.isRequired,
    setMessageRead : PropTypes.func.isRequired,
    deleteMessage : PropTypes.func.isRequired,
    messages : PropTypes.arrayOf(PropTypes.object).isRequired,
    getAccountId : PropTypes.func.isRequired
};


module.exports = Radium(MessageList);