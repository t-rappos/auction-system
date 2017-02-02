var redux = require('redux');


let combinedReducers = redux.combineReducers({
//add reducers here
});

function createStore(){
  return redux.createStore(combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
}

module.exports = {
  createStore : createStore
};
