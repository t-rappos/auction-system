var redux = require('redux');
import chatReducer from 'ChatReducer';
//var CurrentUserReducer = require('CurrentUserReducer');
//var OnlineUsersReducer = require('OnlineUsersReducer');

//var UsersReducer = require('./container/usersReducer.jsx');

console.log("Started loading Redux");

 export var combinedReducers = redux.combineReducers({
  chatReducer
  //currentUser : CurrentUserReducer.currentUserReducer,
  //onlineUsers : OnlineUsersReducer.onlineUserReducer
  //usersReducer: UsersReducer.usersReducer
});

//console.log("Loaded Redux",typeof(combinedReducers)==='function');
/*
var store = redux.createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__());

export function dispatch(action)
{
  store.dispatch(action);
}

export function getState()
{
  return store.getState();
}

export function subscribe(fn)
{
  store.subscribe(fn);
}
*/
