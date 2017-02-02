var React = require('react');

class UsernameInputFormComponent  extends React.Component {
  constructor(props){
    if (!props.dispatchSetCurrentUser
      || (props.dispatchSetCurrentUser
        && typeof(props.dispatchSetCurrentUser) != 'function')){
      throw new Error('UsernameInputFormComponent : Required function as prop\
       for dispatchSetCurrentUser');
    }
    if (!props.sendLoginRequestToServer
      || (props.sendLoginRequestToServer
        && typeof(props.sendLoginRequestToServer) != 'function')){
      throw new Error('UsernameInputFormComponent : Required function as prop\
       for sendLoginRequestToServer');
    }
    super(props);
  }

  onSubmit(e){
    var username = this.input.value;
    var usernameIsValid = /^[a-z0-9]+$/i.test(username);
    if (username !== '' && usernameIsValid){
      this.props.sendLoginRequestToServer(username,(success)=>{
        if (success){
          this.props.dispatchSetCurrentUser(username);
        } else {
          alert('Try a different username please.');
          this.input.value = '';
        }
      });
    }
    e.preventDefault();
  }

  render(){
    return (
      <div ref={node => this.node = node}>
        <form onSubmit= {this.onSubmit.bind(this)}>
          <input type="text"
            size = '14'
            placeholder ='Enter username'
            disabled={this.props.user != ''}
            ref={(input) => this.input = input}></input>
        </form>
      </div>
    );
  }
}
UsernameInputFormComponent.propTypes = {
  user : React.PropTypes.string,
  dispatchSetCurrentUser : React.PropTypes.func.isRequired,
  sendLoginRequestToServer : React.PropTypes.func.isRequired
};
module.exports = UsernameInputFormComponent;
