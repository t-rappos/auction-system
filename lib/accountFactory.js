
let DB = require('./serverDB.js');
let Account =require('./account.js');
let Queries = require('./accountFactoryQueries.js');
let ItemQueries = require('./itemFactoryQueries.js');
//let Utility = require('./utility.js');

/*
function initialise(){
  DB.query(Queries.createTables()).then(function(result){
  }).catch(function(error){
    console.log('accountFactory : initialise : didnt create tables', error);
  });
}
*/

function createAccount(username, password, email){
  return new Promise((resolve,reject)=>{
    let query = DB.query(Queries.createAccount(username, password, email));
    query.then(function(){
      resolve(getAccount(username));
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

function destroyAccount(account){
  return new Promise((resolve,reject)=>{
    if (typeof account != 'object'){
      reject(new Error("destroyAccount: expected account object, received :" + account));
    }
    let query = DB.query(Queries.destroyAccount(account.getUsername()));
    query.then(function(result){
      account.destroy();
      resolve();
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

function destroyAllAccounts(){
  return new Promise((resolve,reject)=>{
    let itemQ = DB.query(ItemQueries.removeAllItems());
    let query = DB.query(Queries.destroyAllAccounts());
    itemQ.then(()=>{
      resolve(query);
    });
  });

}

function _changeAccountEmail(account, email){
  return new Promise((resolve,reject)=>{
    if (typeof account != 'object'){reject( new Error('Expected account to be object not :' + (typeof account)));}
    let query = DB.query(Queries.changeEmail(account.getUsername(),email));
    query.then(function(){
      refreshAccount(account).then(function(){
        resolve();
      });
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

function _changeAccountPassword(account, password){
  return new Promise((resolve,reject)=>{
    if (typeof account != 'object'){reject( new Error('Expected account to be object not :' + (typeof account)));}
    DB.query(Queries.changePassword(account.getUsername(),password))
    .then(function(){
      return refreshAccount(account);
    })
    .then(function(){
      resolve();
    })
    .catch(function(error){
      reject(error);
    });
  });
}

function _changeAccountMoney(account, money){
  return new Promise((resolve,reject)=>{
    if (typeof account != 'object'){reject( new Error('Expected account to be object not :' + (typeof account)));}
    DB.query(Queries.changeMoney(account.getUsername(),money))
    .then(function(){
      return refreshAccount(account);
    })
    .then(function(){
      resolve();
    })
    .catch(function(error){
      reject(error);
    });
  });
}

function _changeAccountDetails(account, details){
  return new Promise((resolve,reject)=>{
    details = JSON.stringify(details);
    if (typeof account != 'object'){reject( new Error('Expected account to be object not :' + (typeof account)));}
    let query = DB.query(Queries.changeDetails(account.getUsername(),details));
    query.then(function(result){
      refreshAccount(account).then(function(){
        resolve();
      });
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

function fillAccount(row){
  let username = row.username;
  let email = row.email;
  let password = row.password;
  let money = Number(row.money);
  let details = JSON.parse(row.details);
  let id = row.id;
  let acc = new Account.Account(id, username, password, email);
  acc.details = details;
  acc.money = money;
  acc._changeEmailFn = _changeAccountEmail.bind(null, acc);
  acc._changePasswordFn = _changeAccountPassword.bind(null, acc);
  acc._changeDetailsFn = _changeAccountDetails.bind(null, acc);
  return acc;
}

//returns promise with account
//if the account doesnt exist it will resolve null
function getAccount(username){
  return new Promise((resolve,reject)=>{
    DB.query(Queries.getAccount(username))
    .then(function(result){
      if (result && result.rows && result.rows.length > 0){
        resolve(fillAccount(result.rows[0]));
      } else {
        resolve(null);
      }
    })
    .catch(function(error){
      reject(error);
    });
  });
}

function getAllAccounts(){
  return new Promise((resolve,reject)=>{
    let users = [];
    DB.query(Queries.getAllAccounts())
    .then(function(result){
      result.rows.map((row)=>{
        users.push(fillAccount(row));
      });
      resolve(users);
    })
    .catch(function(e){
      reject(e);
    });
  });
}

function refreshAccount(oldAccount){
  return new Promise((resolve,reject)=>{
    getAccount(oldAccount.getUsername())
    .then(function(account){
      oldAccount.shallowCopy(account);
      resolve();
    }).catch(function(error){
      reject(error);
    });
  });
}

function getAutocompletedUsernames(text){
  return new Promise((resolve,reject)=>{
    let usernameList = [];
    DB.query(Queries.getMatchingAccountNames(text))
    .then(function(result){
      result.rows.map(function(row){
        usernameList.push(row.username);
      });
      resolve(usernameList);
    }).catch(function(e){
      reject(e);
    });
  });
}

module.exports = {
  createAccount : createAccount,
  destroyAccount : destroyAccount,
  destroyAllAccounts : destroyAllAccounts,
  getAccount : getAccount,
  getAllAccounts : getAllAccounts,
  getAutocompletedUsernames : getAutocompletedUsernames,
  _changeAccountPassword:_changeAccountPassword, //TODO: make these functions only export to tests
  _changeAccountDetails : _changeAccountDetails,
  _changeAccountMoney : _changeAccountMoney
};
