
//var validator = require('validator');
let getAccountModel = require('../serverDB.js').getAccount;
let getMessageModel = require('../serverDB.js').getMessage;
let accountValidator = require('../validation/account.js');
let Utility = require('../utility.js');

/*
create_account(email, username, password)
validate_new_account(username)
validate_new_email(email)
update_account(username, account_details)
remove_account(username)
remove_all_accounts
get_account_details(username) return account_details
autocomplete_username(input) returns suggestion_list
verify_username_exists(username)*/

/*
get_account_messages(username) return message_list
set_message_read(message)
send_message(author, message, recipient)
*/



function verifyUsernameExists(username){
  return new Promise((resolve, reject)=>{
     getAccountModel().findAll({where:{username : username}})
     .then((res)=>{
       let found = res && res.rows && res.rows.length > 0;
       resolve(found);
     })
     .catch((e)=>{
       Utility.logError(e);
     });
  });
}

function verifyEmailExists(email){
  return new Promise((resolve, reject)=>{
     getAccountModel().findAll({where:{email :email}})
     .then((res)=>{
       let found = res && res.rows && res.rows.length > 0;
       resolve(found);
     })
     .catch((e)=>{
       Utility.logError(e);
     });
  });
}

function validateNewUsername(username){
  return new Promise((resolve, reject)=>{
    accountValidator.isUsernameValid(username);
    verifyUsernameExists(username)
    .then((res)=>{
      if (res){
        throw new Error("new username " + username + " is already in use");
      } else {
        resolve(true);
      }
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

function validateNewEmail(email){
  return new Promise((resolve, reject)=>{
    accountValidator.isEmailValid(email);
    verifyEmailExists(email)
    .then((res)=>{
      if (res){
        throw new Error("new email " + email + " is already in use");
      } else {
        resolve(true);
      }
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

function createAccount(username, email, password, money){
  return new Promise((resolve, reject)=>{
    if(money == null || money == undefined){money = 0;}
    accountValidator.isPasswordValid(password);
    validateNewUsername(username)
    .then(()=>{
      return validateNewEmail(email);
    })
    .then(()=>{
       return getAccountModel().create({
          username: username,
          password: password,
          email: email,
          money : money
        });
    })
    .then((account)=>{
      resolve(account);
    })
    .catch((e)=>{
      reject(e);
    });
  });
}

function updateAccountEmail(username, email){
   return getAccountModel().update(
    {email : email},
    {where:{username : username}
  });
}

function updateAccount(username, det){
  let details = JSON.stringify(det);
  return getAccountModel().update(
    {details : details},
    {where:{username : username}
  });
}

function removeAccount(username){
  return getAccountModel().destroy({where:{username : username}});
}

function removeAllAccounts(){
  return getAccountModel().destroy({where:{}});
}

function getAccount(username){
  accountValidator.isUsernameValid(username);
  return getAccountModel().findOne({where:{username:username}});
}

function getAccountDetails(username){
  return new Promise((resolve, reject)=>{
    getAccount(username)
    .then((res)=>{
      resolve(JSON.parse(res.details));
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

function autocompleteUsername(input){
  return new Promise((resolve,reject)=>{
    let usernames = [];
    getAccountModel().findAll({where:{username:{$like : '%'+input+'%'}}})
    .then((res)=>{
      if(res){
        res.map((account)=>{usernames.push(account.username);});
      }
      resolve(usernames);
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

function getAccountMessages(recipientId){
    return getMessageModel().findAll({where:{recipientId : recipientId}});
}

function setMessageRead(messageId){
    return getMessageModel().update({read : true},{where:{id : messageId}});
}

function sendMessage(senderId, recipientId, title, message){
    return getMessageModel().create({
        senderId : senderId, 
        recipientId : recipientId, 
        title : title, 
        content: message,
        time_created : new Date() });
}

function getAccountEmail(account){
   return new Promise((resolve, reject)=>{
      getAccount(account)
      .then((acc)=>{
        resolve(acc.email);
      })
      .catch((e)=>{
        Utility.logError(e);
      });
   });
}

function getAccountMoney(account){
   return new Promise((resolve, reject)=>{
      getAccount(account)
      .then((acc)=>{
        resolve(acc.money);
      })
      .catch((e)=>{
        Utility.logError(e);
      });
   });
}

module.exports = {
  getAccountMessages : getAccountMessages,
  getAccountEmail : getAccountEmail, //TODO: remove these... as they are simply getAccount.email, details, money... etc...
  updateAccountEmail : updateAccountEmail,
  getAccountMoney : getAccountMoney,
  getAccount : getAccount,
  setMessageRead : setMessageRead,
  sendMessage : sendMessage,
  createAccount : createAccount,
  validateNewUsername : validateNewUsername,
  validateNewEmail : validateNewEmail,
  updateAccount : updateAccount,
  removeAccount : removeAccount,
  removeAllAccounts : removeAllAccounts,
  getAccountDetails : getAccountDetails,
  autocompleteUsername : autocompleteUsername,
  verifyUsernameExists : verifyUsernameExists
};
