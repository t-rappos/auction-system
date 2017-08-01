
var React = require('react');
let ServerAPI = require('../../api/server.jsx');
let MessageList = require('./messageList.jsx');
let ToastStore = require('../toast/toastStore.jsx');
let store = require('../../redux/wrapper.jsx').store;

class MessageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {messages : []};
        this.events = [];
        this.sendMessage = this.sendMessage.bind(this);
        this.setMessageRead = this.setMessageRead.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.getAccountId = this.getAccountId.bind(this);
    }

    getAccountId(username, callback){
        ServerAPI.sendAccountIdRequest(username,(res)=>{
            if(res){
                if(res.error){
                    callback(null);
                } else {
                    callback(res.id);
                }
            }
        });
    }

    lookUpSender(id, senders){
        let name = null;
        senders.map((s)=>{if(s.id == id){name = s.name;}});
        return name;
    }

    deleteMessage(messageId){
        ServerAPI.sendMessageDeleteRequest(messageId,(res)=>{
            if(res){
                if(res.error){
                    ToastStore.push("Couldn't delete message", 5000, 'error');
                } else {
                    ToastStore.push("Message deleted", 5000, 'success'); 
                    let newMessages = this.state.messages.filter((msg)=>{return msg.id != messageId;});
                    this.setState({messages : newMessages});
                }
            }
        });
    }

    setMessageRead(messageId){
        ServerAPI.sendMessageReadRequest(messageId,(res)=>{
            if(res){
                if(res.error){
                    ToastStore.push("Couldn't read message", 5000, 'error');
                } else {
                    this.state.messages.find((i)=>{return i.id == messageId;}).read = true;
                    this.forceUpdate();
                }
            }
        });
    }

    sendMessage(recipientId, title, message){
        ServerAPI.sendMessageCreationRequest(recipientId, title, message,(res)=>{
            if(res){
                if(res.error){
                    ToastStore.push("Couldn't send message", 5000, 'error');
                } else {
                    ToastStore.push("Message sent!", 5000, 'success'); //TODO: make ToastStore.pushs into toasts
                }
            }
        });
    }

    loadMessages(){
        ServerAPI.sendMessageListViewRequest((res)=>{
            if(res){
                if(res.error){
                    ToastStore.push('failed to connect to server! ', 5000, 'error');
                } else {
                    if(res.messages && res.messages.length > 0){
                        let messagesWithSenderName 
                            = res.messages.map((msg)=>{
                                msg.senderName = this.lookUpSender(msg.senderId, res.senders); return msg;
                            });
                        this.setState({messages : messagesWithSenderName});
                    }
                }
            }
        });
    }

    componentDidMount() {
       this.loadMessages();
       this.unsubscribe = store.subscribe(()=>{
         let state = store.getState();
         let eventCount = state.refreshMessagesReducer ? state.refreshMessagesReducer.length : 0;
         if(eventCount > this.events.length){
             this.events = state.refreshMessagesReducer;
             this.loadMessages();
         }
       });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

     render(){
        return (
            <MessageList 
                sendMessage = {this.sendMessage} 
                setMessageRead = {this.setMessageRead}
                deleteMessage = {this.deleteMessage}
                messages = {this.state.messages}
                getAccountId = {this.getAccountId}
            />
        );
     }
}

/*
MessageContainer.propTypes = {
    onImageSelection : PropTypes.func.isRequired
};
*/

module.exports = MessageContainer;