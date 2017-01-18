const currentUserDefaultState = '';

export const currentUserReducer = (state=currentUserDefaultState,action) => {
  switch(action.type){
    case 'SET_CURRENT_USER':
      console.log('currentUserReducer: set current user', action.user);
      return action.user;
    default:
      return state;
  }
}
export default currentUserReducer;
