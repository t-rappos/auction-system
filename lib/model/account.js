
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

  module.exports = {
    Account : Account
  };
