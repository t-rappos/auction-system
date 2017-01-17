var React = require('react');
var UserComponent = require('UserComponent');
var ServerApi = require('ServerAPI');

const OnlineUsersListComponentListStyle = {
  overflowY:'scroll',
  overflowX:'scroll',
  listStyleType: 'none',
  backgroundColor: '#DEB272',
  paddingLeft: '0pt',
  maxWidth: '200pt',
  minWidth: '100pt',
  height: '70vh',
};

const OnlineUsersListComponentStyle = {

}

class OnlineUsersListComponent  extends React.Component {
  constructor(props){
    super(props);

    //get users
    ServerApi.getUserList((users) => {
      this.props.setUsers(users);
      console.log('OnlineUserListComponent:getUserList', users);
    });

    //set callbacks
    ServerApi.setOnLoginCallback((user)=>{
      console.log('ServerApi.setOnLoginCallback',user);
      this.props.addUser(user);
    })
    ServerApi.setOnLogoutCallback((user)=>{
      console.log('ServerApi.setOnLogoutCallback',user);
      this.props.removeUser(user);
    });
  }
  render(){
    var userId = 0;

    return (
      <div style={OnlineUsersListComponentStyle}>
        <ul style={OnlineUsersListComponentListStyle}>
          {
            this.props.users.map(function(user){
              return(<UserComponent username = {user} key={userId++}/>);
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = OnlineUsersListComponent;
