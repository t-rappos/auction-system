var React = require('react');
var Redux = require('Redux');
var UserLogin = require('UserLogin');

//console.log('users redux store',Redux.store);

//Redux.store.subscribe(()=>{
//  var state = store.getState();
//  console.log("redux state changed", store.getState());
//});

//callback : function()
//{
//  console.log("users: Redux state change callback");
//};

  export function setUser(user)
  {
    var action = {
      type: 'SET_USER',
      loggedInUser: user
    };

    Redux.dispatch(action);
  }

  export function getUser()
  {
    var state = Redux.getState().usersReducer;
    return state.user;
  }

  export function isUserLoggedIn()
  {
    var user = getUser();
    return (user && user !== '');
  }

  export function getUsers()
  {
    var state = Redux.getState().usersReducer;
    return state.users;
  }

  export function logoutUser()
  {
    var user = getUser();
    console.log('logging out user ', user);
    UserLogin.sendLogout(user).then(
      function(res){
        console.log('Users: user log out send and recieved', res);
      },
      function(errorMessage){
        alert(errorMessage);
      }
    );
  }

  export function updateUserList()
  {
    let users;

    UserLogin.getUsers().then(
      function(u){
        users = u.slice();
        console.log('Users: gathered users..', users, u);
        var action = {
          type: 'USER_LIST',
          users: users
        };
        Redux.dispatch(action);
      },
      function(errorMessage){
        alert(errorMessage);
      }
    );
  }
