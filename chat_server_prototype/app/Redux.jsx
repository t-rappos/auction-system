var redux = require('redux');

//var UsersReducer = require('./container/usersReducer.jsx');

console.log("Loaded Redux");

var reducer = redux.combineReducers({
  //usersReducer: UsersReducer.usersReducer
});

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
