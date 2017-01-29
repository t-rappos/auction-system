var redux = require('redux');
import {chatReducer} from 'ChatReducer';
import {currentUserReducer} from 'CurrentUserReducer';
import {onlineUsersReducer} from 'OnlineUsersReducer';

let combinedReducers = redux.combineReducers({
 chatReducer,
 currentUserReducer,
 onlineUsersReducer
});

function createStore(){
  return redux.createStore(combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
}

module.exports = {
  createStore : createStore
};
