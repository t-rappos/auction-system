var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {name:'Anonymous'}, action) => {

  console.log('New action', action);
  switch(action.type){
    case 'CHANGE_NAME':
      console.log("change-name");
      return{
        ...state,
        name: action.name
      };
    default:
      console.log("default");
      return state;
  }
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Andrew'
};

store.dispatch(action);

console.log('Name should be andrew', store.getState());
