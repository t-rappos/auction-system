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
    this.setState(
      {
        ...this.state,
        user: clickedUserName
      }
    );
  }

  render()
  {
    const userList = this.state.userList;
    const user = this.state.user;
    let userItemId = 0;
    return (
      <div className = "user-list">
        <h4>UserLoginList, current user = {user}</h4>

        {userList.map((username) => {
          return(
              <ListItem
                key = {userItemId++}
                content={username}
                onClickParentHandler = {this.onItemClick.bind(this)}
                isSelected = {(this.state.user === username) ? true : false}
                />
          );
        })}

      </div>
    );
  }

}

module.exports = UserLoginList;
