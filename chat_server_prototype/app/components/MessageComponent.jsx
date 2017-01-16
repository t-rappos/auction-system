var React = require('react');

class MessageComponent  extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <li>message component msg:{this.props.content}</li>
    );
  }
}

//enforce strict typing
ListItem.propTypes = {
  author : React.PropTypes.string.isRequired,
  content : React.PropTypes.string.isRequired
};


ListItem.defaultProps = {
  author : 'no author',
  content : 'default message',
};

module.exports = MessageComponent;
