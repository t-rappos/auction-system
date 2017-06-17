
/*const accountTable =
"CREATE TABLE IF NOT EXISTS account\
(\
  id serial PRIMARY KEY,\
  username text UNIQUE NOT NULL,\
  password text NOT NULL,\
  email text NOT NULL,\
  money numeric DEFAULT 0.00,\
  details text \
);";
*/

let accountValidator = require('../validation/account.js');
let isUsernameValid = accountValidator.isUsernameValid;
let isPasswordValid = accountValidator.isPasswordValid;
let isEmailValid = accountValidator.isEmailValid;

function Account(sequelizeObj, SequelizeLib){
  return sequelizeObj.define('account',{
    id: { type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    username: {
      type: SequelizeLib.STRING,
      allowNull: false,
      unique: true,
      validate:{fn(v){isUsernameValid(v);}}
    },
    password: {type: SequelizeLib.STRING, allowNull: false, validate:{fn(v){isPasswordValid(v);}}},
    email: {type: SequelizeLib.STRING, allowNull: false, validate:{fn(v){isEmailValid(v);}}},
    money: {type:SequelizeLib.DOUBLE, defaultValue: 0.00},
    details: {type: SequelizeLib.STRING}
  });
}

//function validateUsername(username){
//  var isString = Utility.isString(username);
//  var isAlphaNum = Utility.isAlphaNumeric(username);
//  var sizeOk = false;
//  if (isString){sizeOk = username.length <= 20 && username.length >= 3;}
//  return isString && isAlphaNum && sizeOk;
//}

//function validateEmail(email){
//  //http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
//  var re = /\S+@\S+\.\S+/;
//  return re.test(email);
//}

//function validateDetails(details){
//  var isObject = typeof details === 'object';
//  var isNotNull = details != '' && details != null;
//  return isNotNull && isObject;
//}

//function validatePassword(password){
//  var isString = Utility.isString(password);
//  var sizeOk = false;
//  if (isString){sizeOk = password.length <= 20 && password.length >= 3;}
//  return isString && sizeOk;
//}

/*
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
      this._changeEmailFn = ()=>{};
      this._changePasswordFn =  ()=>{};
      this._changeDetailsFn  =  ()=>{};
      this._changeMoneyFn = ()=>{};
      this._addMoneyFn = ()=>{};
      this._refreshFn = ()=>{};
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
    return this._addMoneyFn(Number(amount));
  }

  changeMoney(newAmount){
    return this._changeMoneyFn(Number(newAmount));
  }

  changePassword(oldPw, newPw){
    if (validatePassword(oldPw)){
      return this._changePasswordFn(newPw);
    } else {
      throw new Error('invalid password');
    }
  }

  changeEmail(email, callbackFn){
    if (validateEmail(email)){
      return this._changeEmailFn(email);
    } else {
      throw new Error('invalid email');
    }
  }

  changeDetails(details, callbackFn){
    if (validateDetails(details)){
      return this._changeDetailsFn(details);
    } else {
      throw new Error('invalid details');
    }
  }
}
*/

  module.exports = {
    Account : Account
  };
