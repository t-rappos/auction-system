
var Utility = require('./utility.js');

function validateUsername(username){
  var isString = Utility.isString(username);
  var isAlphaNum = Utility.isAlphaNumeric(username);
  var sizeOk = false;
  if (isString){sizeOk = username.length <= 20 && username.length >= 3;}
  return isString && isAlphaNum && sizeOk;
}

function validateEmail(email){
  //http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateDetails(details){
  var isObject = typeof details === 'object';
  var isNotNull = details != '' && details != null;
  return isNotNull && isObject;
}

function validatePassword(password){
  var isString = Utility.isString(password);
  var sizeOk = false;
  if (isString){sizeOk = password.length <= 20 && password.length >= 3;}
  return isString && sizeOk;
}

class Account{
  constructor(id, username, password, email, details, money){
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.details = details;
    this.money = money;
    this._changeEmailFn = ()=>{};
    this._changePasswordFn =  ()=>{};
    this._changeDetailsFn  =  ()=>{};
    this._changeMoneyFn = ()=>{};
    this._addMoneyFn = ()=>{};
    this._refreshFn = ()=>{};
  }
  shallowCopy(otherAccount){
    if (otherAccount){
      this.id = otherAccount.id;
      this.username = otherAccount.username;
      this.password = otherAccount.password;
      this.email = otherAccount.email;
      this.details = otherAccount.details;
      this.money = otherAccount.money;
    } else {
      this.id = null;
      this.username = null;
      this.password = null;
      this.email = null;
      this.details = null;
      this.money = null;
    }
  }

  compareDetails(otherAccount){
    return Utility.debugCompare(this.details,otherAccount.details, 'account details',true);
  }

  equals(otherAccount){
    return Utility.debugCompare(this,otherAccount, 'accounts',true);
  }

  destroy(){
    this.shallowCopy(null);
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    this._refreshFn();
    return this.password;
  }
  getEmail(){
    this._refreshFn();
    return this.email;
  }

  getDetails(){
    this._refreshFn();
    return this.details;
  }

  getMoney(){
    this._refreshFn();
    return this.money;
  }

  getId(){
    return this.id;
  }

  checkPassword(password){
    this._refreshFn();
    return this.password === password;
  }

  addMoney(amount){
    return new Promise((resolve, reject)=>{
      resolve(this._addMoneyFn(Number(amount)));
    });
  }

  changeMoney(newAmount){
    return new Promise((resolve, reject)=>{
      resolve(this._changeMoneyFn(Number(newAmount)));
    });
  }

  changePassword(oldPw, newPw){
    return new Promise((resolve,reject)=>{
      let valid = validatePassword(oldPw);
      if (valid){
        resolve(this._changePasswordFn(newPw));
      }else{
        reject('invalid password');
      }
    });
  }

  changeEmail(email, callbackFn){
    return new Promise((resolve,reject)=>{
      let valid = validateEmail(email);
      if (valid){
        resolve(this._changeEmailFn(email));
      }else{
        reject('invalid email');
      }
    });
  }

  changeDetails(details, callbackFn){
    return new Promise((resolve,reject)=>{
      let valid = validateDetails(details);
      if (valid){
        resolve(this._changeDetailsFn(details));
      }else{
        reject('invalid details');
      }
    });
  }
}

  module.exports = {
    validateDetails : validateDetails,
    validateEmail : validateEmail,
    validatePassword : validatePassword,
    validateUsername : validateUsername,
    Account : Account
  };
