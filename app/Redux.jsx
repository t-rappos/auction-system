var redux = require('redux');
import chatReducer from 'ChatReducer';
import currentUserReducer from 'CurrentUserReducer';
import onlineUsersReducer from 'OnlineUsersReducer';

console.log("Started loading Redux");

 export var combinedReducers = redux.combineReducers({
  chatReducer,
  currentUserReducer,
  onlineUsersReducer
});
