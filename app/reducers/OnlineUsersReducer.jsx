const onlineUsersDefaultState = [];

export const onlineUsersReducer = (state=onlineUsersDefaultState,action) => {
  switch(action.type){

    case 'ADD_USER':{
      return [...state,action.user];
    }

    case 'REMOVE_USER':{
        let result = [];
      var filtered_results = state.filter(user=>user!==action.user);
      filtered_results.map(function(user){
        result.push(user);
      });
      return result;
    }

    case 'SET_USERS':{
      let result = [];
      action.users.map(function(user){
        result.push(user);
      });
      return result;
    }

    default:{
      return state;
    }
  }
};

export default onlineUsersReducer;
