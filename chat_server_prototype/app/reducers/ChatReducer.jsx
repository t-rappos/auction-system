export const chatReducer = (state=[],action) => {
  switch(action.type){

    case 'MESSAGE':
      return [
        ...state,
        { //append new item to end of array
          author : action.message.author,
          message: action.message.message,
          date: action.message.date
        }
      ];
    case 'GET_MESSAGES':
      var result = [];
      action.messages.map(function(message){
        result.push(
          {
            author : message.author,
            message: message.message,
            date: message.date
          })
      });
      console.log('ChatReducer:GET_MESSAGES:', result);
      return result;

    default:
      return state;
  }
}
export default chatReducer;
/*
let usersDefaultState = {
  user : '',
  userList : []
};

module.exports =
{
    usersReducer: function(state = usersDefaultState, action){
      console.log('userReducer',state, action);
      switch(action.type){

        //TODO: for some reason this syntax results in a messy return object
        //var res = [...state,{users: action.users}];

        case 'USER_LIST':
          var result = {
            user: state.user,
            users: state.users ? state.users.slice() : []
          };
          if (action.users){
            result.users = action.users.slice();
          }
          return result;

        case 'SET_USER':
          var result = {
            user: action.loggedInUser ? action.loggedInUser : state.user,
            users: state.users ? state.users.slice() : []
          };
          return result;

        default:
          return state;
      }
    }
}
*/
