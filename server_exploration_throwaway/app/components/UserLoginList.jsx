var React = require('react');
var UserLogin = require('UserLogin');
var ListItem = require('ListItem');
//var store = require('Redux').configure();

//http://stackoverflow.com/questions/28511207/react-js-onclick-event-handler

function Item(props) {
  //return <li>{props.message}</li>;
  return <ListItem content={props.message}/>;
}

function Listify(items) {
  //const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  if (typeof items !== 'undefined') {
    return (
      <ul>
        {items.map((message) => <Item key={message} message={message} />)}
      </ul>
    );
  }
  else
  {
    return (
      <ul>null</ul>
    );
  }
}

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
    var userListHtml = Listify(userList);
    var user = this.state.user;

    return (
      <div>
        <h4>UserLoginList, current user = {user}</h4>
        {userListHtml}
      </div>
    );
  }

}

module.exports = UserLoginList;
