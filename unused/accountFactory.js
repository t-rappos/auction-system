//
// let DB = require('./serverDB.js');
// //let Account =require('./account.js');
// //let Queries = require('./accountFactoryQueries.js');
// //let ItemQueries = require('./itemFactoryQueries.js');
// //let TagQueries = require('./tagFactoryQueries.js');
// //let ListingQueries = require('./listingFactoryQueries.js');
// //let Utility = require('./utility.js');
// //let UtilData = require('./utilData.js');
//
// // Cache system
// //let cachedAccounts = []; //indexed by id
// //let cachedAccountsValid = []; //indexed by id
// //let cachedAccountIds = []; //indexed by name
//
// //its assumed that the cached account is current from DB
//
// /*
// function cacheAccount(account){
//   if(account === null || account === undefined || typeof account != 'object'){
//     throw new Error("Account must be of type object, not :" + typeof account);
//   }
//   let id = account.id;
//   cachedAccounts[id] = account;
//   cachedAccountsValid[id] = true;
//   cachedAccountIds[account.username] = id;
// }
//
// function getAccountFromCache(id){
//   return cachedAccounts[id];
// }
//
// function invalidateCacheFor(id){
//   cachedAccountsValid[id] = false;
// }
//
// function isCacheValidFor(id){
//   return cachedAccountsValid[id] == true;
// }
//
// function getCachedAccountId(name){
//   return cachedAccountIds[name];
// }
//
// */
//
// //end Cache system
//
// //function fillAccount(row){
// //  let username = row.username;
// //  let email = row.email;
// //  let password = row.password;
// //  let money = Number(row.money);
// //  let details = JSON.parse(row.details);
// //  let id = row.id;
// //  let acc = new Account.Account(id, username, password, email);
// //  acc.details = details;
// //  acc.money = money;
// //  acc._changeEmailFn = _changeAccountEmail.bind(null, acc);
// //  acc._changePasswordFn = _changeAccountPassword.bind(null, acc);
// //  acc._changeDetailsFn = _changeAccountDetails.bind(null, acc);
// //  acc._changeMoneyFn = _changeAccountMoney.bind(null, acc);
// //  acc._refreshFn = _refreshAccount.bind(null, acc);
// //  acc._addMoneyFn = _addAccountMoney.bind(null, acc);
// //  cacheAccount(acc);
// //  return acc;
// //}
//
// /*function createTag(name){
//   return DB.getTag().create({name:name});
// }
//
// function getTag(name){
//   return DB.getTag().findOne({where:{name:name}});
// }
//
// function getAllTags(){
//   return DB.getTag().findAll();
// }
//
// function removeTag(tag){
//   return DB.getTag().destroy({where:{name:tag.name}});
// }
//
// function removeAllTags(){
//   return DB.getTag().destroy({where:{}});
// }*/
//
// //gets account from db or cache if it hasnt changed
// function fetchAccount(id){
//   /*
//   if(id == null || id == undefined || id == ''){
//     throw new Error("fetchAccount() id must not be : " + id);
//   }
//   return new Promise((resolve, reject)=>{
//     if(id==null){
//       resolve(null);
//     }
//     if(isCacheValidFor(id)){
//       let account = getAccountFromCache(id);
//       resolve(account);
//     } else {
//       DB.getAccount().findOne({where:{id:id}})//DB.getSingle(Queries.getAccountFromId(id), fillAccount)
//       .then((acc)=>{
//         cacheAccount(acc);
//         resolve(acc);
//       })
//       .catch((e)=>{
//         Utility.logError(e);
//       });
//     }
//   });
//   */
//   return DB.getAccount().findOne({where:{id:id}});
// }
//
// function fetchAllAccounts(){
//   return DB.getAccount().findAll({where:{}});//DB.getMany(Queries.getAllAccounts(), fillAccount);
// }
//
// function createAccount(username, password, email, money){
//   if (money == undefined){money = 0;}
//   return DB.getAccount().create({username: username, password: password, email: email, money : money});
// }
//
// function destroyAccount(account){
//   return DB.getAccount().destroy({where:{username : account.username}});
//   //if(account == null || account == undefined || account == ''){throw new Error("destroyAccount() : account must not be : " + account);}
//   //return new Promise((resolve,reject)=>{
//   //  if (typeof account != 'object'){
//   //    throw(new Error("destroyAccount: expected account object, received :" + account));
//   //  }
//   //  DB.getAccount().destroy({where:{username : account.username}})
//   //  .then(resolve)
//   //  .catch(function(e){
//   //    Utility.logError(e);
//   //  });
//   //});
// }
//
// function destroyAllAccounts(){
//
//   return DB.getAccount().destroy({where:{}});
//
//   //return UtilData.clearAllAccounts();
// }
//
//
// function changeAccountEmail(account, email){
//   return DB.getAccount().update({email : email},{where:{id : account.id}});
// }
//
// function changeAccountPassword(account, oldPassword, password){
//     return DB.getAccount().update({password : password},{where:{id : account.id}});
// }
//
// function addAccountMoney(account, amount){
//   return DB.getAccount().increment({money:amount},{where:{id : account.id}});
// }
//
// function changeAccountMoney(account, money){
//   return DB.getAccount().update({money : money},{where:{id : account.id}});
// }
//
// function changeAccountDetails(account, details){
//   details = JSON.stringify(details);
//   return DB.getAccount().update({details : details},{where:{id : account.id}});
// }
//
// //function _refreshAccount(account){
// //  if(isCacheValidFor(account.id)){
// //    account.shallowCopy(getAccountFromCache(account.id));
// //  } else {
// //    throw new Error("can't refresh account, account is stale");
// //  }
// //}
//
// //End of injected functions
//
// //returns promise with account
// //if the account doesnt exist it will resolve null
// function getAccount(username){
//   if(username == null || username == undefined || username == ''){throw new Error("username must not be : " + username);}
//   return DB.getAccount().findOne({where:{username:username}});
// }
//
// function getAccountFromId(id){
//   if(id == null || id == undefined || id == ''){throw new Error("getAccountFromId() : id must not be : " + id);}
//   return fetchAccount(id);
// }
//
// function getAllAccounts(){
//   return fetchAllAccounts();
// }
//
// function getAutocompletedUsernames(text){
//   return DB.getAccount().findAll({where:{username:{$like : '%text%'}}});
//   //DB.getMany(Queries.getMatchingAccountNames(text), (row)=>{return row.username;});
// }
//
// module.exports = {
//   createAccount : createAccount,
//   destroyAccount : destroyAccount,
//   destroyAllAccounts : destroyAllAccounts,
//   getAccount : getAccount,
//   getAccountFromId : getAccountFromId,
//   getAllAccounts : getAllAccounts,
//   getAutocompletedUsernames : getAutocompletedUsernames,
//   changeAccountPassword : changeAccountPassword,
//   changeAccountDetails : changeAccountDetails,
//   changeAccountMoney : changeAccountMoney,
//   changeAccountEmail : changeAccountEmail,
//   addAccountMoney : addAccountMoney
// };
