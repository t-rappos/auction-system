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
  content : React.PropTypes.string.isRequired
};


ListItem.defaultProps = {
  content : 'default text',
};

module.exports = MessageComponent;
