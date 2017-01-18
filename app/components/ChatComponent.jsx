var React = require('react');
var MessageComponent = require('MessageComponent');
var ServerApi = require('ServerAPI');

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
  constructor(props){
    super(props);

    //fetch all the messages stored on the server
    ServerApi.getMessageList((messages)=>{
      console.log("ChatComponent recieved messages from serverAPI");
      this.props.onMessageListRecieved(messages);
    });

    //subscribe to new message events from server
    ServerApi.setOnMessageCallback((message)=>{
      console.log("ChatComponent heard new message", message);
      this.props.onNewMessage(message);
    })
  }

  render(){
    var messageId = 0;
    return (
      <div style={ChatComponentStyle}>
        <ul style={ChatComponentListStyle}>{
            this.props.messages.map(function(message){
                return(<MessageComponent
                  author= {message.author}
                  content={message.message}
                  date={message.date}
                  key={messageId++}/>);
              })
          }
        </ul>
      </div>
    );
  }
}

module.exports = ChatComponent;
