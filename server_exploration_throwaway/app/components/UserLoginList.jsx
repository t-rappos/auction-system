var React = require('react');
var UserLogin = require('UserLogin');
var ListItem = require('ListItem');
//var store = require('Redux').configure();

//http://stackoverflow.com/questions/28511207/react-js-onclick-event-handler

class UserLoginList extends React.Component{

  constructor(props){
    super(props);
    this.state =
    {
      userList : [],
      user : '...',
      userSelected : false,
      userLoggedIn : false,
      message : 'Please select a username',
      status : 'Selected : '
    };

    let tempThis = this;

    UserLogin.getUsers().then(
      function(users){
        tempThis.setState(
          {
            ...tempThis.state,
            userList:users
          });
      },
      function(errorMessage){
        alert(errorMessage);
      }
    );

/*
    console.log("starting subscribe");
    store.subscribe(()=>{
      var state = store.getState();
      console.log("redux subscriber called, name changed to",state.username);
      this.setState(
        {
          ...this.getState(),
          user : state.username
        }
      );
    });
    console.log("ending subscribe");

*/
}

  onItemClick(clickedUserName)
  {
    if (!this.state.userLoggedIn)
    {
      this.setState(
        {
          ...this.state,
          user: clickedUserName,
          userSelected : true
        }
      );
    }
  }

  handleSubmit(event)
  {
    event.preventDefault();
    console.log("client Submitting");

    this.setState({
        ...this.state,
        message : 'Processing...'});

    let formData = {user : this.state.user};
    let tempThis = this;

    UserLogin.sendLoginChoice(formData)
    .then(function(response){
        console.log('UserLoginList - post success');
        tempThis.setState({
            ...tempThis.state,
            userLoggedIn : true,
            status : 'Logged in as : ',
            message : ''
          });
      })
      .catch(function(errorMessage){
        console.log('UserLoginList - post fail');
        alert(errorMessage);
      }
    );

  }

  render()
  {
    let userItemId = 0;
    return (
      <div className = "user-list">
        <h4>UserLoginList, {this.state.status} {this.state.user}</h4>
        <form action="" onSubmit = {this.handleSubmit.bind(this)}>
        {this.state.userList.map((username) => {
          return(
              <ListItem
                key = {userItemId++}
                content={username}
                onClickParentHandler = {this.onItemClick.bind(this)}
                isSelected = {(this.state.user === username) ? true : false}
                />
          );
        })}
        <button type="submit" className="btn btn-default" disabled={!this.state.userSelected || this.state.userLoggedIn}>
            Login
        </button>
        </form>
      <h5>{this.state.message}</h5>
      </div>
    );
  }

}

module.exports = UserLoginList;
