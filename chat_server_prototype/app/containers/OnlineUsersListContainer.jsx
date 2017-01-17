var React = require('react');
import {connect} from 'react-redux'
import {addUser} from '../actions'
import {setUsers} from '../actions'
import OnlineUsersListComponent from 'OnlineUsersListComponent'

const mapStateToProps = (state) => {
  return {
    users: state.onlineUsersReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //to be called when a new message is recieved
    addUser : (user)=>{         //define prop callback
      dispatch(addUser(user));  //define action generator
    },

    removeUser : (user)=>{
      dispatch(removeUser(user));
    },

    //to be called when the message list is gathered at startup
    setUsers : (messages)=>{
      dispatch(setUsers(messages));
    }

  }
};

const OnlineUsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineUsersListComponent);

module.exports = OnlineUsersListContainer;
