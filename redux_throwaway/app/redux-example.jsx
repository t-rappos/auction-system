var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {name:'Anonymous'}, action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return{
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

var store = redux.createStore(reducer);

//subscribe to changes
store.subscribe(()=>{
  var state = store.getState();
  console.log('name is', state.name);
});

var action = {
  type: 'CHANGE_NAME',
  name: 'Andrew'
};

store.dispatch(action);

var action2 = {
  type: 'CHANGE_NAME',
  name: 'asdfsadf'
};

store.dispatch(action2);
