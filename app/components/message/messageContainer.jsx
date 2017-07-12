
var React = require('react');
let ServerAPI = require('../../api/server.jsx');
let MessageList = require('./messageList.jsx');

class MessageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {messages : []};
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
                    alert("Couldn't delete message");
                } else {
                    alert("Message deleted"); 
                }
            }
        });
    }

    setMessageRead(messageId){
        ServerAPI.sendMessageReadRequest(messageId,(res)=>{
            if(res){
                if(res.error){
                    alert("Couldn't read message");
                }
            }
        });
    }

    sendMessage(recipientId, title, message){
        ServerAPI.sendMessageCreationRequest(recipientId, title, message,(res)=>{
            if(res){
                if(res.error){
                    alert("Couldn't send message");
                } else {
                    alert("Message sent!"); //TODO: make alerts into toasts
                }
            }
        });
    }

    loadMessages(){
        ServerAPI.sendMessageListViewRequest((res)=>{
            if(res){
                if(res.error){
                    alert('failed to connect to server! ');
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
    }

     render(){
        return (
            <MessageList 
                sendMessage = {this.sendMessage.bind(this)} 
                setMessageRead = {this.setMessageRead.bind(this)}
                deleteMessage = {this.deleteMessage.bind(this)}
                messages = {this.state.messages}
                getAccountId = {this.getAccountId.bind(this)}
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