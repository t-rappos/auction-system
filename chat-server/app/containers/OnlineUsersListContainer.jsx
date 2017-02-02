import {connect} from 'react-redux';
import {addUser,removeUser,setUsers} from '../actions';
import OnlineUsersListComponent from 'OnlineUsersListComponent';

const mapStateToProps = (state) => {
  return {
    users: state.onlineUsersReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //to be called when a new message is recieved
    dispatchAddUser : (user)=>{         //define prop callback
      dispatch(addUser(user));  //define action generator
    },

    dispatchRemoveUser : (user)=>{
      dispatch(removeUser(user));
    },

    //to be called when the message list is gathered at startup
    dispatchSetUsers : (messages)=>{
      dispatch(setUsers(messages));
    }

  };
};

const OnlineUsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineUsersListComponent);

module.exports = OnlineUsersListContainer;
