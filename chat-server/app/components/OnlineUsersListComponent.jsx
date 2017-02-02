var React = require('react');
var UserComponent = require('UserComponent');

const OnlineUsersListComponentListStyle = {
  overflowY:'scroll',
  overflowX:'scroll',
  listStyleType: 'none',
  backgroundColor: '#DEB272',
  paddingLeft: '0pt',
//  maxWidth: '200pt',
//  minWidth: '100pt',
//  height: '70vh',
    maxHeight : '20vh',
};

class OnlineUsersListComponent  extends React.Component {

  constructor(props){
    if ((props.users && props.users.constructor != Array)||!props.users){
      throw new Error('OnlineUsersListComponent : TypeError : expected "users" to be array, recieved :'+typeof(props.users));}
    if (!props.getUserListFromServer || typeof(props.getUserListFromServer)!='function'){
      throw new Error('OnlineUsersListComponent : Required function as prop');}
    if (!props.setCallbackForLogins || typeof(props.setCallbackForLogins)!='function'){
      throw new Error('OnlineUsersListComponent : Required function as prop');}
    if (!props.setCallbackForLogouts || typeof(props.setCallbackForLogouts)!='function'){
      throw new Error('OnlineUsersListComponent : Required function as prop');}
    if (!props.dispatchSetUsers || typeof(props.dispatchSetUsers)!='function'){
      throw new Error('OnlineUsersListComponent : Required function as prop');}
    if (!props.dispatchAddUser || typeof(props.dispatchAddUser)!='function'){
      throw new Error('OnlineUsersListComponent : Required function as prop');}
    if (!props.dispatchRemoveUser || typeof(props.dispatchRemoveUser)!='function'){
      throw new Error('OnlineUsersListComponent : Required function as prop');}
    super(props);
    //get users
    this.props.getUserListFromServer((users) => {
      this.props.dispatchSetUsers(users);
    });
    //set callbacks
    this.props.setCallbackForLogins((user)=>{
      this.props.dispatchAddUser(user);
    });
    this.props.setCallbackForLogouts((user)=>{
      this.props.dispatchRemoveUser(user);
    });
  }
  render(){
    var userId = 0;
    return (
      <div ref={node => this.node = node}>
        <ul style={OnlineUsersListComponentListStyle}>{
            this.props.users.map(function(user){
              return(<UserComponent username = {user} key={userId++}/>);
            })}
        </ul>
      </div>
    );
  }
}
OnlineUsersListComponent.propTypes = {
  users : React.PropTypes.arrayOf(React.PropTypes.string),
  getUserListFromServer : React.PropTypes.func.isRequired,
  setCallbackForLogins : React.PropTypes.func.isRequired,
  setCallbackForLogouts : React.PropTypes.func.isRequired,
  dispatchSetUsers: React.PropTypes.func.isRequired,
  dispatchAddUser: React.PropTypes.func.isRequired,
  dispatchRemoveUser: React.PropTypes.func.isRequired
};
module.exports = OnlineUsersListComponent;
