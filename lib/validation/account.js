var validator = require('validator');

function isUsernameValid(username){
  if(!validator.isAlphanumeric(username)){throw new Error('Username must be alphanumeric');}
  if(!validator.isLength(username, {min:3,max:20})){throw new Error('Username have [3,20] characters');}
}

function isPasswordValid(password){
  if(!validator.isLength(password, {min:3,max:20})){throw new Error('Password must have [3,20] characters');}
}

function isEmailValid(email){
  if(!validator.isEmail(String(email))){throw new Error("Email has incorrect format :  " + String(email));}
}

module.exports = {
  isUsernameValid : isUsernameValid,
  isPasswordValid : isPasswordValid,
  isEmailValid : isEmailValid
};
