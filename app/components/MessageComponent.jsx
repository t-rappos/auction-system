var React = require('react');
var DateFormat = require('dateformat');

class MessageComponent  extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var time = DateFormat(this.props.date,"h:MM:ss TT");
    return (
        <li>[{time}] {this.props.author} : {this.props.content}</li>
    );
  }
}

//enforce strict typing
MessageComponent.propTypes = {
  author : React.PropTypes.string.isRequired,
  content : React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired
};


MessageComponent.defaultProps = {
  author : 'no author',
  content : 'default message',
  date : new Date()
};

module.exports = MessageComponent;
