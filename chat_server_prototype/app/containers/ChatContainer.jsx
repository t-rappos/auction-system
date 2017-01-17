import React from 'react'
import {connect} from 'react-redux'
import {addMessage} from '../actions'
import ChatComponent from 'ChatComponent'

const mapStateToProps = (state) => {
  console.log(mapStateToProps, state.chatReducer);
  return {
    messages: state.chatReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewMessage : (msg) => {
      dispatch(addMessage(msg))
    }
  }
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent);

module.exports = ChatContainer;
