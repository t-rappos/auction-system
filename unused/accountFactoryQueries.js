function createAccount(username, password, email, money){
  return 'INSERT INTO account (username, password, email, money) VALUES ' + "('"+username+"', '"+password+"', '"+email+ "', '"+money+"') RETURNING *;";
}

function destroyAccount(username){
  return "DELETE FROM account WHERE username = '" + username + "';";
}

function destroyAllAccounts(){
  return "DELETE FROM account WHERE 1 = 1;";
}

function changeEmail(username,email){
  return "UPDATE account SET email = '"+email+"' WHERE username = '"+username+"';";
}

function changePassword(username, password){
  return  "UPDATE account SET password = '"+password+"' WHERE username = '"+username+"';";
}

function addMoney(username, amount){
  return "UPDATE account SET money = money + '"+amount+"' WHERE username = '"+username+"';";
}

function changeMoney(username, money){
  return  "UPDATE account SET money = '"+money+"' WHERE username = '"+username+"';";
}

function changeDetails(username, details){
  return "UPDATE account SET details = '"+details+"' WHERE username = '"+username+"';";
}

function getAccount(username){
  return "SELECT * FROM account WHERE username = '" + username + "';";
}

function getAccountFromId(id){
  return "SELECT * FROM account WHERE id = '" + id + "';";
}

function getAllAccounts(){
  return "SELECT * FROM account WHERE 1=1;";
}

function getMatchingAccountNames(text){
  return "SELECT username FROM account WHERE username LIKE '" + text + "%';";
}

module.exports = {
  createAccount : createAccount,
  destroyAccount : destroyAccount,
  destroyAllAccounts : destroyAllAccounts,
  changeEmail : changeEmail,
  changePassword : changePassword,
  changeDetails : changeDetails,
  getAccount : getAccount,
  getAccountFromId : getAccountFromId,
  getAllAccounts : getAllAccounts,
  changeMoney : changeMoney,
  addMoney : addMoney,
  getMatchingAccountNames: getMatchingAccountNames
};