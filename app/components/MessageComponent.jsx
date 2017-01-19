var React = require('react');
var DateFormat = require('dateformat');

class MessageComponent  extends React.Component {
  constructor(props){
    if (!props.author){throw new Error("MessageComponent: Author Missing");
      if (props.author===''){throw new Error("MessageComponent: Author Null");}}

    if (!props.content){throw new Error("MessageComponent: Message Missing");
      if (props.content===''){throw new Error("MessageComponent: Message null");}}

    if (!props.date){throw new Error("MessageComponent: Date Missing");
      if (instanceOf(props.date) !== instanceOf(Date)){throw new Error("MessageComponent: Date wrong type");}}

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
        <li>{this.formatMessage()}</li>
    );
  }
}

//enforce strict typing
MessageComponent.propTypes = {
  author : React.PropTypes.string.isRequired,
  content : React.PropTypes.string.isRequired,
  date: React.PropTypes.instanceOf(Date).isRequired
};

module.exports = MessageComponent;
