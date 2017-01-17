var React = require('react');

const UserStyle = {
  backgroundColor: '#AE92A2'
};

class UserComponent  extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <li style = {UserStyle}>{this.props.username}</li>
    );
  }
}

//enforce strict typing
UserComponent.propTypes = {
  username : React.PropTypes.string.isRequired
};


UserComponent.defaultProps = {
  username: 'null'
};

module.exports = UserComponent;
