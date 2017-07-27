var redux = require('redux');

function refreshItemReducer(state = [], action){
  let ns = [];
  state.map((i)=>{ns.push(i);});
  if(action.type === 'REFRESH_ITEMS'){
    ns.push(action);
  }
  return ns;
}

function refreshMessagesReducer(state = [], action){
  let ns = [];
  state.map((i)=>{ns.push(i);});
  if(action.type === 'REFRESH_MESSAGES'){
    ns.push(action);
  }
  return ns;
}

let combinedReducers = redux.combineReducers({
  refreshItemReducer, 
  refreshMessagesReducer
});

function createStore(){
  return redux.createStore(combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
}

let store = createStore();

module.exports = {
  store : store
};
