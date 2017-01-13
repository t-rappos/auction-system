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
      user : 'not-selected'
    };

    var tempThis = this;

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

  render()
  {
    var userList = this.state.userList;
    var user = this.state.user;
    var userItemId = 0;
    console.log('userList', userList);
    return (
      <div className = "user-list">
        <h4>UserLoginList, current user = {user}</h4>

        {userList.map((username) => {
          return(
              <ListItem content={username} key = {userItemId++}/>
          );
        })}

      </div>
    );
  }

}

module.exports = UserLoginList;
