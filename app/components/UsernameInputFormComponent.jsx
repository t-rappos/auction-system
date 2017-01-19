var React = require('react');
var ServerApi = require('ServerAPI');

class UsernameInputFormComponent  extends React.Component {
  constructor(props){
    super(props);
    //window.onbeforeunload = ()=>{
    //  var username = this.props.user;
    //  console.log("UsernameInputFormComponent unmounting, logging out user",username);
    //  if (username){
    //    serverApi.sendUserLogoutNotification(username);
    //    this.props.setCurrentUser('');
    //  }};
  }

  onSubmit(e){
    var username = this.input.value;
    console.log("User entered username",username);
    if (username !== '')
    {
      ServerApi.sendUserLoginRequest(username,(success)=>{
        if (success){
          this.props.dispatchSetCurrentUser(username);
          console.log("username accepted",username);
        }
        else
        {
          alert('Try a different username please.');
          this.input.value = '';
        }
      });
    }
    e.preventDefault();
  }

  render(){
    return (
      <div>
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

module.exports = UsernameInputFormComponent;
