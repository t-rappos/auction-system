var React = require('react');
var UserLogin = require('UserLogin');
var ListItem = require('ListItem');
var Users = require('../container/users.jsx');
var Redux = require('Redux');
//var store = require('Redux').configure();

//http://stackoverflow.com/questions/28511207/react-js-onclick-event-handler



class UserLoginList extends React.Component{




  constructor(props){
    super(props);
    this.state =
    {
      selectedUser : '',
      message : 'Please select a username',
      status : 'Selected : '
    };

    let tempThis = this;
    console.log(Users);
    Users.updateUserList();

    //TODO: find a way to redraw this component when redux state changes...
    Redux.subscribe(()=>{
      console.log('hackRefresh');
      var tmp = this.state.message;
      this.setMessage('refresh');
      this.setMessage(tmp);
    });

    Redux.subscribe(()=>{
      var state = Redux.getState();
      console.log("redux state changed", Redux.getState());});
  }

  setSelectedUser(username){
    this.setState({
        ...this.state,
        selectedUser : username
      });
  }

  setMessage(msg){
    this.setState({
        ...this.state,
        message : msg
      });
  }

  setStatus(sts){
    this.setState({
        ...this.state,
        status : sts
      });
  }

  isUserSelected()
  {
    return (this.state.selectedUser !== '');
  }

  onItemClick(clickedUserName)
  {
    //if (!this.state.userLoggedIn)
    if (!Users.isUserLoggedIn())
    {
      console.log('bp here');
      this.setSelectedUser(clickedUserName);
      //this.setState(
      //  {
      //    ...this.state,
      //    selectedUser : clickedUserName
      //  }
      //);
    }
  }

  handleSubmit(event)
  {
    event.preventDefault();
    console.log("client Submitting");

    this.setMessage('Processing...');
    //this.setState({
    //    ...this.state,
    //    message : 'Processing...'});

    let formData = {user : this.state.selectedUser};
    let tempThis = this;

    UserLogin.sendLoginChoice(formData)
    .then(function(response){
        console.log('UserLoginList - post success');
        Users.setUser(tempThis.state.selectedUser);
        tempThis.setStatus('Logged in as : ');
        tempThis.setMessage('');
        //tempThis.setState({
        //    ...tempThis.state,
        //    userLoggedIn : true,
        //    status : 'Logged in as : ',
        //    message : ''
        //  });
      })
      .catch(function(errorMessage){
        console.log('UserLoginList - post fail', errorMessage);
        alert(errorMessage);
      }
    );
  }

  render()
  {
    let userItemId = 0;
    let userList = Users.getUsers();
    var printOut = '';
    console.log("rendering user list", userList);
    if (userList !== undefined)
    {
      printOut = userList.map((username) => {
      return(
        <ListItem
          key = {userItemId++}
          content={username}
          onClickParentHandler = {this.onItemClick.bind(this)}
          isSelected = {(this.state.selectedUser === username) ? true : false}
          />
      );
    });
    }
    console.log("rendering user list", printOut);
    return (
      <div className = "user-list">
        <h4>UserLoginList, {this.state.status} {Users.getUser()}</h4>
        <form action="" onSubmit = {this.handleSubmit.bind(this)}>
        {printOut}
        <button type="submit" className="btn btn-default" disabled={!this.isUserSelected() || Users.isUserLoggedIn()}>
            Login
        </button>
        </form>
      <h5>{this.state.message}</h5>
      </div>
    );
  }

}

module.exports = UserLoginList;



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
