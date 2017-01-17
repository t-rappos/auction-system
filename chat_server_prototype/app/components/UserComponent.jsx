var React = require('react');

class MessageComponent  extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <li>{this.props.username}</li>
    );
  }
}

//enforce strict typing
ListItem.propTypes = {
  username : React.PropTypes.string.isRequired
};


ListItem.defaultProps = {
  username: 'null'
};

module.exports = MessageComponent;
