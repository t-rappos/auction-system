import React from 'react'
import {connect} from 'react-redux'
import {addMessage} from '../actions'
import {setMessageList} from '../actions'
import ChatComponent from 'ChatComponent'

const mapStateToProps = (state) => {
  return {
    messages: state.chatReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //to be called when a new message is recieved
    onNewMessage : (msg)=>{ //TODO: maybe call these methods dispatchNewMessage
      dispatch(addMessage(msg));
    },

    //to be called when the message list is gathered at startup
    onMessageListRecieved : (messages)=>{
      dispatch(setMessageList(messages));
    }
  }
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent);

module.exports = ChatContainer;
