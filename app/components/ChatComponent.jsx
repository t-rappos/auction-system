var React = require('react');
var MessageComponent = require('MessageComponent');

const ChatComponentStyle = {
  float: 'right'
};

const ChatComponentListStyle = {
  overflow:'hidden',
  overflowY:'scroll',
  overflowX:'scroll',
  listStyleType: 'none',
  backgroundColor: '#DEB272',
  paddingLeft: '0pt',
  width: '80vw',
  maxWidth: '400pt',
  height: '70vh',
};



class ChatComponent extends React.Component {

  getServerMessages(){
    //fetch all the messages stored on the server
    this.props.serverApiGetMessageList((messages)=>{
      console.log("ChatComponent recieved messages from serverAPI");
      this.props.onMessageListRecieved(messages);
    });
  }

  subscribeToNewServerMessages(){
    //subscribe to new message events from server
    this.props.serverApiSetOnMessageCallback((message)=>{
      console.log("ChatComponent heard new message", message);
      this.props.onNewMessage(message);
    })
  }

  constructor(props){
    if (props.messages && props.messages.constructor != Array){
      throw new Error('ChatComponent : TypeError : expected "messages" to be array, recieved :'+typeof(messages));
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
          key={messageId++}/>)}) : '';

    return (
      <div style={ChatComponentStyle}>
        <ul style={ChatComponentListStyle}>{items}</ul>
      </div>
    );
  }
}

ChatComponent.propTypes = {
  onMessageListRecieved : React.PropTypes.func.isRequired, 
  onNewMessage : React.PropTypes.func.isRequired,
  messages : React.PropTypes.arrayOf(React.PropTypes.object),
  serverApiGetMessageList : React.PropTypes.func.isRequired, //called by the server sending messages, after making a request for it
  serverApiSetOnMessageCallback : React.PropTypes.func.isRequired //called by the server sending message
};

module.exports = ChatComponent;
