var React = require('react');
var UserLogin = require('UserLogin');
var List = require('List');

//http://stackoverflow.com/questions/28511207/react-js-onclick-event-handler

function Item(props) {
  return <li>{props.message}</li>;
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


//http://stackoverflow.com/questions/38081367/using-react-to-get-data-from-server-and-update-components-state
//https://www.quora.com/Is-it-possible-to-consume-a-RESTful-API-with-React-js-alone-i-e-without-any-server-side-language-provided-the-API
//TODO: try this next to get data from server
/*
  maybe see if flux or redux can fetch data from server?
*/

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
        <h4>Clickable List</h4>
        <List/>
      </div>
    );
  }
}

module.exports = UserLoginList;
