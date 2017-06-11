
let DB = require('./serverDB.js');
let Account =require('./account.js');
let Queries = require('./accountFactoryQueries.js');
let ItemQueries = require('./itemFactoryQueries.js');
let TagQueries = require('./tagFactoryQueries.js');
let ListingQueries = require('./listingFactoryQueries.js');
let Utility = require('./utility.js');

// Cache system
let cachedAccounts = []; //indexed by id
let cachedAccountsValid = []; //indexed by id
let cachedAccountIds = []; //indexed by name

//its assumed that the cached account is current from DB
function cacheAccount(account){
  if(account === null || account === undefined || typeof account != 'object'){
    throw new Error("Account must be of type object, not :" + typeof account);
  }
  let id = account.getId();
  cachedAccounts[id] = account;
  cachedAccountsValid[id] = true;
  cachedAccountIds[account.getUsername()] = id;
}

function getAccountFromCache(id){
  return cachedAccounts[id];
}

function invalidateCacheFor(id){
  cachedAccountsValid[id] = false;
}

function isCacheValidFor(id){
  return cachedAccountsValid[id] == true;
}

function getCachedAccountId(name){
  return cachedAccountIds[name];
}
//end Cache system

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
  acc._changeMoneyFn = _changeAccountMoney.bind(null, acc);
  acc._refreshFn = _refreshAccount.bind(null, acc);
  acc._addMoneyFn = _addAccountMoney.bind(null, acc);
  cacheAccount(acc);
  return acc;
}

//gets account from db or cache if it hasnt changed
function fetchAccount(id){
  if(id == null || id == undefined || id == ''){
    throw new Error("fetchAccount() id must not be : " + id);
  }
  return new Promise((resolve, reject)=>{
    if(id==null){
      resolve(null);
    }
    if(isCacheValidFor(id)){
      let account = getAccountFromCache(id);
      resolve(account);
    } else {
      DB.getSingle(Queries.getAccountFromId(id), fillAccount)
      .then((acc)=>{
        cacheAccount(acc);
        resolve(acc);
      });
    }
  });
}

function fetchAllAccounts(){
  return DB.getMany(Queries.getAllAccounts(), fillAccount);
}

function createAccount(username, password, email, money){
  if (money == undefined){money = 0;}
  return DB.getSingle(Queries.createAccount(username, password, email, money), fillAccount);
}

function destroyAccount(account){
  if(account == null || account == undefined || account == ''){throw new Error("destroyAccount() : account must not be : " + account);}
  return new Promise((resolve,reject)=>{
    cachedAccounts[account.getId()] = null;
    cachedAccountsValid[account.getId()] = null;
    cachedAccountIds[account.getUsername()] = null;
    if (typeof account != 'object'){
      throw(new Error("destroyAccount: expected account object, received :" + account));
    }
    DB.query(Queries.destroyAccount(account.getUsername()))
    .then(function(result){
      account.destroy();
      resolve();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });
}

function destroyAllAccounts(){
  return new Promise((resolve,reject)=>{
    cachedAccounts = [];
    cachedAccountsValid = [];
    cachedAccountIds = [];
    let tagq = DB.query(TagQueries.removeAllTagValues());
    let itemQ = DB.query(ItemQueries.removeAllItems());
    let query = DB.query(Queries.destroyAllAccounts());
    let lqq = ListingQueries.cancelAllListings();
    let lq = [DB.query(lqq[0]),DB.query(lqq[1])];
    resolve(Promise.all([lq[1], lq[0], tagq, itemQ, query]));
  });

}

function changeAccountParam(account, query){
  return new Promise((resolve,reject)=>{
    if (typeof account != 'object'){reject( new Error('Expected account to be object not :' + (typeof account)));}
    invalidateCacheFor(account.getId());
    DB.query(query)
    .then(()=>{return fetchAccount(account.getId());})
    .then((acc)=>{
      account.shallowCopy(acc);
      resolve();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });
}

//Injected functions - Only called from inside Account
function _changeAccountEmail(account, email){
  return changeAccountParam(account,Queries.changeEmail(account.getUsername(),email));//return new Promise((resolve,reject)=>{
}

function _changeAccountPassword(account, password){
  return changeAccountParam(account,Queries.changePassword(account.getUsername(),password));
}

function _addAccountMoney(account, amount){
  return changeAccountParam(account,Queries.addMoney(account.getUsername(),amount));
}

function _changeAccountMoney(account, money){
  return changeAccountParam(account,Queries.changeMoney(account.getUsername(),money));
}

function _changeAccountDetails(account, details){
  details = JSON.stringify(details);
  return changeAccountParam(account,Queries.changeDetails(account.getUsername(),details));
}

function _refreshAccount(account){
  if(isCacheValidFor(account.getId())){
    account.shallowCopy(getAccountFromCache(account.getId()));
  } else {
    throw new Error("can't refresh account, account is stale");
  }
}

//End of injected functions

//returns promise with account
//if the account doesnt exist it will resolve null
function getAccount(username){
  if(username == null || username == undefined || username == ''){throw new Error("username must not be : " + username);}
  return new Promise((resolve,reject)=>{
    try{
      let id = getCachedAccountId(username);
      if(id == undefined || id == null){
        resolve(null);
      } else {
        resolve(fetchAccount(id));
      }
    } catch( e){
      Utility.logError(e);
      resolve(null);
    }
  });
}

function getAccountFromId(id){
  if(id == null || id == undefined || id == ''){throw new Error("getAccountFromId() : id must not be : " + id);}
  return new Promise((resolve,reject)=>{
    resolve(fetchAccount(id));
  });
}

function getAllAccounts(){
  return new Promise((resolve,reject)=>{
    resolve(fetchAllAccounts());
  });
}

function getAutocompletedUsernames(text){
  return DB.getMany(Queries.getMatchingAccountNames(text), (row)=>{return row.username;});
}

module.exports = {
  createAccount : createAccount,
  destroyAccount : destroyAccount,
  destroyAllAccounts : destroyAllAccounts,
  getAccount : getAccount,
  getAccountFromId : getAccountFromId,
  getAllAccounts : getAllAccounts,
  getAutocompletedUsernames : getAutocompletedUsernames,
  _changeAccountPassword : _changeAccountPassword,
  _changeAccountDetails : _changeAccountDetails,
  _changeAccountMoney : _changeAccountMoney,
  _addAccountMoney : _addAccountMoney
};
