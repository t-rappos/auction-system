var React = require('react');
var UserLogin = require('UserLogin');

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
//TODO: try this next to get data from server
var UserLoginList = React.createClass({

  getInitialState: function () {
    var that = this;
    UserLogin.getUsers().then(function(users){
      that.setState({
           userList: users
      });
     }, function (errorMessage) {
         alert(errorMessage);
     });

      return {
          userList: []
      }
    },

  render: function(){

    var userList = this.state.userList;
    var userListHtml = Listify(userList);

    return (
      <div>
        <h4>UserLoginList</h4>
        {userListHtml}
      </div>

    );
  }
});

module.exports = UserLoginList;
