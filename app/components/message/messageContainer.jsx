
var React = require('react');
let ServerAPI = require('../../api/server.jsx');
let MessageList = require('./messageList.jsx');

class MessageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {messages : []};
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
                } else {
                    alert("Message read");
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
                    alert("Message sent!");
                }
            }
        });
    }

    loadMessages(){
        ServerAPI.sendMessageListViewRequest((res)=>{
            if(res){
                console.log("fetched messages : ", res);
                if(res.error){
                    alert('failed to connect to server! ' + res.error);
                } else {
                    if(res.messages && res.messages.length > 0){
                        this.setState({messages : res.messages});
                    } else {
                        this.setState({messages : []});
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
            <div> 
            <MessageList 
                sendMessage = {this.sendMessage.bind(this)} 
                setMessageRead = {this.setMessageRead.bind(this)}
                deleteMessage = {this.deleteMessage.bind(this)}
                messages = {this.state.messages}

            />
            </div>
        );
     }
}

/*
MessageContainer.propTypes = {
    onImageSelection : PropTypes.func.isRequired
};
*/

module.exports = MessageContainer;