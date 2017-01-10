var React = require('react');
var UserLogin = require('UserLogin');
var ListItem = require('ListItem');

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
    this.state = {userList : []};
    var tempThis = this;

    UserLogin.getUsers().then(
      function(users){
        tempThis.setState({userList:users});
      },
      function(errorMessage){
        alert(errorMessage);
      }
    );
  }

  render()
  {
    var userList = this.state.userList;
    var userListHtml = Listify(userList);

    return (
      <div>
        <h4>UserLoginList</h4>
        {userListHtml}
      </div>
    );
  }
}

module.exports = UserLoginList;
