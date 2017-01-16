

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
