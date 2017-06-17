let AccountFactory = require('./accountFactory.js');
let Utility = require('./utility.js');

class User{
  constructor(username, socket){
    this.username = username;
    this.socket = socket;
  }
  getUsername(){return this.username;}
  getSocket(){return this.socket;}
  checkPassword(password){
    return new Promise((resolve, reject)=>{
      AccountFactory.getAccount(this.username)
      .then(function(account){
        resolve(account.checkPassword(password));
      })
      .catch(function(e){
        Utility.logError(e);
      });
    });
  }
}


module.exports = {
  User : User
};
