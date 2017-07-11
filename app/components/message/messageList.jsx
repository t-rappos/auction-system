
var React = require('react');
import PropTypes from 'prop-types';
let MessageView = require('./messageView.jsx');
let Modal = require('../modal.jsx');
let MessageForm = require('./messageForm.jsx');

const exitMessageViewButtonStyle = {
    float : 'right'
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


class MessageList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open : false, 
                        forceClosed : [], //is message view open for specific message
                        composeForceClosed : true,
                        composeForceOpen : false,
                        replyTitle : '',
                        replyContents: '',
                        replyRecipient : -1
                    };
    }

    replyCallback(messageId){
        let index = this.props.messages.findIndex((msg)=>{return msg.id == messageId;});
        if(index != -1){
            this.setState({
                        replyTitle : this.props.messages[index].title,
                        replyContents: this.props.messages[index].content,
                        replyRecipient : this.props.messages[index].senderId,
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
                                                replyRecipient : -1,
                                                composeForceClosed : false
                                            });
                                        }} 
                                        className='button open-modal' 
                                        style = {messageButtonStyle}
                                    >
                                    New Message</div>
                                    <MessageForm 
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
                let labelText = msg.read ? msg.title:<strong>{msg.title}</strong>;
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
                                    style = { {cursor: 'pointer'} }>{labelText}</div>
                                <MessageView 
                                    replyCallback = {this.replyCallback.bind(this)}
                                    forceCloseModal = {
                                        ()=>{
                                            let fc = this.state.forceClosed; 
                                            fc[i]=true; 
                                            this.setState({forceClosed : fc});
                                        }} 
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
        return messageList;
    }

    render(){
        let unreadMessages = (this.props.messages?this.props.messages.filter((msg)=>{return msg.read == false;}):[]);
        let unreadCount = unreadMessages.length;
        let messageList = this.renderMessageList();
        let composeModal =  this.renderComposeButton();

        let list = (this.state.open && this.props.messages)
            ? 
            <div>
                <table style={messageListStyle}>
                    <tbody>
                        {messageList}
                    </tbody>
                </table>
                {composeModal}
            </div> 
            : 
            <div></div>;
        
        let unreadLabel = <span style = {{borderRadius: '8px'}} className = 'label success round'>{unreadCount}</span>;
        let readLabel = <span style = {{borderRadius: '8px', background: '#2f94ec'}} className = 'label round'>{this.props.messages.length}</span>;

        let unreadLabel2 = unreadCount > 0 ? <span style={{float:'right'}}> {unreadLabel}  New </span> : '';

        return (
            <div>
                <div className='button' 
                    style = {messageButtonStyle}
                    onClick={()=>{this.setState({open: !this.state.open});}}
                >   
                    <span style={{width:'100%'}}>
                        <span style={{float:'left'}}>{readLabel}   Messages</span>
                        {unreadLabel2}
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
    messages : PropTypes.arrayOf(PropTypes.object).isRequired
};


module.exports = MessageList;