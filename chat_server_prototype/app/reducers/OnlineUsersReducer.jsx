const onlineUsersDefaultState = [];

export const onlineUsersReducer = (state=onlineUsersDefaultState,action) => {
  switch(action.type){

    case 'ADD_USER':
      console.log('onlineUsers: Adding user to list:',action.user,state.length+1);
      return [...state,action.user];

    case 'REMOVE_USER':
      var result = [];
      console.log('onlineUsers: Removing user from list:',state.length-1);
      var filtered_results = state.filter(user=>user!=='action.user');
      filtered_results.map(function(user){
        result.push(user);
      });
      return result;

    case 'SET_USERS':
      var result = [];
      action.users.map(function(user){
        result.push(user);
      });
      console.log('onlineUsers: setting user list:', result.length);
      return result;

    default:
      return state;
  }
}
export default onlineUsersReducer;
