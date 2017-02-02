var React = require('react');

const UserStyle = {
  backgroundColor: '#AE92A2'
};

class UserComponent  extends React.Component {
  constructor(props){
    if (!props.username){throw new Error('UserComponent: Username required as prop');}
    else if (props.username === ''){throw new Error('UserComponent: Username must not be null');}
    super(props);
  }

  render(){
    return (
        <li ref={node => this.node = node} style = {UserStyle}>{this.props.username}</li>
    );
  }
}

//enforce strict typing
UserComponent.propTypes = {
  username : React.PropTypes.string.isRequired
};

module.exports = UserComponent;
