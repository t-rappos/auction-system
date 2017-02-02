import {connect} from 'react-redux';
import {setCurrentUser} from '../actions';
import UsernameInputFormComponent from 'UsernameInputFormComponent';

const mapStateToPropsB = (state) => {
  return {
    user: state.currentUserReducer
  };
};

const mapDispatchToPropsB = (dispatch) => {
  return {
    //to be called when a username is submitted
    dispatchSetCurrentUser : (username)=>{
      dispatch(setCurrentUser(username));
    },
  };
};

const UsernameInputFormContainer = connect(
  mapStateToPropsB,
  mapDispatchToPropsB
)(UsernameInputFormComponent);

module.exports = UsernameInputFormContainer;
