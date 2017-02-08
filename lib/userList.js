
let Utility = require('./utility.js');
let User = require('./user.js');
var array = require('lodash/array');

let users = [];

function compareSocket(a,b){
  return Utility.isEqual(a,b);
}

function getNumberOfUsers(){
  return users.length;
}

function login(username, password, socket){
  return new Promise((resolve,reject) => {
    if(getUsername(socket)){
      reject(new Error("User already logged in"));
    }
    let user = new User.User(username, socket);
    user.checkPassword(password).then(function(result){
      users.push(user);
      resolve();
    })
    .catch(function(e){
      reject(e);
    });
  });
}

function logout(socket){
  let username = getUsername(socket);
  array.remove(users,{username : username});
}

function getUsername(socket){
  let res = null;
  users.map((user)=>{
    if (!res && compareSocket(user.getSocket(),socket)){
      res = user.getUsername();
    }
  });
  return res;
}

function logoutAllUsers(){
  users = [];
}

module.exports = {
  getNumberOfUsers : getNumberOfUsers,
  login : login,
  logout : logout,
  getUsername : getUsername,
  logoutAllUsers : logoutAllUsers
};
