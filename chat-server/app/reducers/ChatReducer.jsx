const chatReducerDefaultState = [];

export const chatReducer = (state=chatReducerDefaultState,action) => {
  switch(action.type){

    case 'MESSAGE': {//TODO: rename this to ADD_MESSAGE
      return [
        ...state,
        { //append new item to end of array
          author : action.message.author,
          message: action.message.message,
          date: new Date(action.message.date)
        }
      ];}
    case 'GET_MESSAGES': {//TODO: rename this to SET_MESSAGES?
      var result = [];
      action.messages.map(function(message){
        result.push({
            author : message.author,
            message: message.message,
            date: new Date(message.date)
          });
      });
      return result;}

    default:{
      return state;}
  }
};
export default chatReducer;
