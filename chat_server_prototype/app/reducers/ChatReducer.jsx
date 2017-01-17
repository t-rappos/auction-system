const chatReducerDefaultState = [];

export const chatReducer = (state=chatReducerDefaultState,action) => {
  switch(action.type){

    case 'MESSAGE': //TODO: rename this to ADD_MESSAGE
      console.log('ChatReducer: Adding message to list:',state.length+1);
      return [
        ...state,
        { //append new item to end of array
          author : action.message.author,
          message: action.message.message,
          date: action.message.date
        }
      ];
    case 'GET_MESSAGES': //TODO: rename this to SET_MESSAGES?
      var result = [];
      action.messages.map(function(message){
        result.push(
          {
            author : message.author,
            message: message.message,
            date: message.date
          })
      });
      console.log('ChatReducer: Setting message list:', result.length);
      return result;

    default:
      return state;
  }
}
export default chatReducer;
