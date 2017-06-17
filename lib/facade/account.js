
//var validator = require('validator');
let getAccountModel = require('../serverDB.js').getAccount;
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
get_account_messages(username) return message_list
get_message_detail(message) return message_details
set_message_read(message)
send_message(author, message, recipient)
autocomplete_username(input) returns suggestion_list
verify_username_exists(username)*/


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

function createAccount(username, email, password){
  return new Promise((resolve, reject)=>{
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
          money : 0
        });
    })
    .then((account)=>{
      resolve(account);
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}



function updateAccount(username, det){
  let details = JSON.stringify(det);
  return getAccountModel().update({details : details},{where:{username : username}});
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




module.exports = {
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