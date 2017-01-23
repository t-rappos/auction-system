import {connect} from 'react-redux';
import ChatInputFormComponent from 'ChatInputFormComponent';

//define what do we need from redux state
const mapStateToPropsA = (state) => {
  return {
    user: state.currentUserReducer
  };
};

//define what actions we need to call
const mapDispatchToPropsA = (dispatch) => {
  return {};
};

const ChatInputFormContainer = connect(
  mapStateToPropsA,
  mapDispatchToPropsA
)(ChatInputFormComponent);

module.exports = ChatInputFormContainer;
