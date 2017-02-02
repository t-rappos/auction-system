var React = require('react');
var DateFormat = require('dateformat');

const MessageStyle = {
  wordWrap: 'breakWord'
};

class MessageComponent  extends React.Component {
  constructor(props){
    if (!props.author){throw new Error("MessageComponent: Author Missing");}
    else if (props.author===''){throw new Error("MessageComponent: Author Null");}

    if (!props.content){throw new Error("MessageComponent: Message Missing");}
    else if (props.content===''){throw new Error("MessageComponent: Message null");}

    if (!props.date){
      throw new Error("MessageComponent: Date Missing");
    }else{
      if (typeof(props.date) !== 'object'){
        throw new Error("MessageComponent: Date wrong type");
      }
    }

    super(props);
  }

  getDate(){
    return this.props.date;
  }

  formatDate(date){
    return DateFormat(date,"h:MM:ss TT");
  }

  formatMessage(){
    return '['+this.formatDate(this.props.date)+']' + ' '+ this.props.author + ' : ' + this.props.content;
  }

  render(){
    return (
        <li style={MessageStyle} ref={node => this.node = node}>{this.formatMessage()}</li>
    );
  }
}

//enforce strict typing
MessageComponent.propTypes = {
  author : React.PropTypes.string.isRequired,
  content : React.PropTypes.string.isRequired, //TODO: rename this to message
  date: React.PropTypes.instanceOf(Date).isRequired
};

module.exports = MessageComponent;
