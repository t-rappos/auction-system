import React from 'react';
import MessageComponent from 'MessageComponent';

const ChatComponentStyle = {
  //float: 'right'
};

const ChatComponentListStyle = {
  overflow:'hidden',
  overflowY:'scroll',
  overflowX:'scroll',
  listStyleType: 'none',
  backgroundColor: '#DEB272',
  paddingLeft: '0pt',
  //width: '80vw',
  //maxWidth: '400pt',
  maxHeight:'50vh',
//  height: '70vh',
};

class ChatComponent extends React.Component {

  scrollToBottom(){
    //update view to scroll
    setTimeout(()=>{
      let currentScroll = $(this.list)[0].scrollTop;
      let desiredScroll =  $(this.list)[0].scrollHeight - $(this.list)[0].clientHeight;
      let quality = 20.0;
      let dScroll = (desiredScroll - currentScroll) / quality;
      let dt = 300.0 / quality;
      for (let i = 0; i < quality-1.00; i++){
        setTimeout(()=>{
          $(this.list)[0].scrollTop += dScroll;
        },20+(dt*i));
      }
      setTimeout(()=>{
        $(this.list)[0].scrollTop = desiredScroll;
      },20+(dt*quality));
    },100);
  }

  getServerMessages(){
    //fetch all the messages stored on the server
    this.props.getMessageListFromServer((messages)=>{
      this.props.dispatchSetMessageList(messages);
      this.scrollToBottom();
    });
  }

  subscribeToNewServerMessages(){
    //subscribe to new message events from server
    this.props.setCallbackForNewMessages((message)=>{
      this.props.dispatchAddMessage(message);
      this.scrollToBottom();
    });
  }

  constructor(props){
    if (props.messages && props.messages.constructor != Array){
      throw new Error('ChatComponent : TypeError : expected "messages" to be array, recieved :'+typeof(messages));
    }
    if (!props.dispatchSetMessageList || typeof(props.dispatchSetMessageList)!='function'){
      throw new Error('ChatComponent : Required function as prop');
    }
    if (!props.dispatchAddMessage || typeof(props.dispatchAddMessage)!='function'){
      throw new Error('ChatComponent : Required function as prop');
    }
    if (!props.getMessageListFromServer || typeof(props.getMessageListFromServer)!='function'){
      throw new Error('ChatComponent : Required function as prop');
    }
    if (!props.setCallbackForNewMessages || typeof(props.setCallbackForNewMessages)!='function'){
      throw new Error('ChatComponent : Required function as prop');
    }

    super(props);
    this.getServerMessages();
    this.subscribeToNewServerMessages();
  }

  render(){
    var messageId = 0;
    var items = this.props.messages ? this.props.messages.map(function(message){
        return(<MessageComponent
          author= {message.author}
          content={message.message}
          date={message.date}
          key={messageId++}/>);}) : '';

    return (
      <div  ref={node => this.node = node} style={ChatComponentStyle}>
        <ul ref={list => this.list = list} style={ChatComponentListStyle}>{items}</ul>
      </div>
    );
  }
}

ChatComponent.propTypes = {
  dispatchSetMessageList : React.PropTypes.func.isRequired,
  dispatchAddMessage : React.PropTypes.func.isRequired,
  messages : React.PropTypes.arrayOf(React.PropTypes.object),
  getMessageListFromServer : React.PropTypes.func.isRequired, //called by the server sending messages, after making a request for it
  setCallbackForNewMessages : React.PropTypes.func.isRequired //called by the server sending message
};

module.exports = ChatComponent;
