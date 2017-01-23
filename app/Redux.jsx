var redux = require('redux');
import chatReducer from 'ChatReducer';
import currentUserReducer from 'CurrentUserReducer';
import onlineUsersReducer from 'OnlineUsersReducer';

 export var combinedReducers = redux.combineReducers({
  chatReducer,
  currentUserReducer,
  onlineUsersReducer
});
