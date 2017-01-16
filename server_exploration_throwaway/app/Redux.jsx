var redux = require('redux');
//var users = require('./container/users.jsx');
var UsersReducer = require('./container/usersReducer.jsx');

//var Redux = redux.createStore(reducer);
//module.exports = Redux;

//var defaultState = {
//  username : 'redux-default-state',
//  loggedInUser : '',
//  loggedInUsers : []
//};

//var nextMovieId = 0;

/*
var reducer1 = (state = defaultState, action) => {
  switch(action.type){
    case 'LOGIN_USERNAME_CLICKED':
    console.log("redux reducer -> login username clicked");
      return{
        ...state,
        username: action.username
      };

    case 'ADD_MOVIE':
    return{
      ...state,
      movies: [
        ...state.movies,
        {
          id : nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    };
    */

    /*
    case 'REMOVE_MOVIE':
    return{
      ...state,
      movies: state.movies.filter((movie) => movie.id !== action.id);
    };


    default:
      return state;
  }
};

var nameReducer = (state = 'DefaultName',action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id : nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby)=> hobby.id != action.id);
    default:
      return state;
  }
};

*/




//var store = redux.createStore(reducer,
//  window.__REDUX_DEVTOOLS_EXTENSION__
//  && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log("Loaded Redux");

var reducer = redux.combineReducers({
  //name: nameReducer,
  //hobbies: hobbiesReducer,
  usersReducer: UsersReducer.usersReducer
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
  //Redux.store.subscribe(()=>{
  //  var state = store.getState();
  //  console.log("redux state changed", store.getState());
  //});
  store.subscribe(fn);
}
//export var configure = () => {
  //var defaultState = {
  //  username : 'redux-default-state'
  //};

  //var reducer = (state = defaultState, action) => {
  //  switch(action.type){
  //    case 'LOGIN_USERNAME_CLICKED':
  //    console.log("redux reducer -> login username clicked");
  //      return{
  //        ...state,
  //        username: action.username
  //      };
  //    default:
  //      return state;
  //  }
  //};

  //var store = redux.createStore(reducer);
  //return store;

  //var reducer = redux.combineReducers({
  //  //name: nameReducer,
  //  //hobbies: hobbiesReducer,
  //  users: users.usersReducer
  //});

  //var store = redux.createStore(reducer,
  //  window.__REDUX_DEVTOOLS_EXTENSION__
  //  && window.__REDUX_DEVTOOLS_EXTENSION__());
  //return store;

//}


/*
class Redux extends React.Component
{

}
*/

//subscribe to changes

/*
store.subscribe(()=>{
  var state = store.getState();
});


//action generator
var changeName = (name) => {
  return{
    type: 'CHANGE_NAME',
    name
  }
};

var action = {
  type: 'CHANGE_NAME',
  name: 'Andrew'
};

store.dispatch(action);
*/
