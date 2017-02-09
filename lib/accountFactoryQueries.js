
function createTables(){
  return "CREATE TABLE IF NOT EXISTS account\
  (\
    id serial PRIMARY KEY,\
    username text UNIQUE NOT NULL,\
    password text NOT NULL,\
    email text NOT NULL,\
    money numeric DEFAULT 0.00,\
    details text \
  );";
}

function createAccount(username, password, email){
  return 'INSERT INTO account (username, password, email) VALUES ' + "('"+username+"', '"+password+"', '"+email+ "');";
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

function changeMoney(username, money){
  return  "UPDATE account SET money = '"+money+"' WHERE username = '"+username+"';";
}

function changeDetails(username, details){
  return "UPDATE account SET details = '"+details+"' WHERE username = '"+username+"';";
}

function getAccount(username){
  return "SELECT * FROM account WHERE username = '" + username + "';";
}

function getAllAccounts(){
  return "SELECT * FROM account WHERE 1=1;";
}

function getMatchingAccountNames(text){
  return "SELECT username FROM account WHERE username LIKE '" + text + "%';";
}

module.exports = {
  createTables : createTables,
  createAccount : createAccount,
  destroyAccount : destroyAccount,
  destroyAllAccounts : destroyAllAccounts,
  changeEmail : changeEmail,
  changePassword : changePassword,
  changeDetails : changeDetails,
  getAccount : getAccount,
  getAllAccounts : getAllAccounts,
  changeMoney : changeMoney,
  getMatchingAccountNames: getMatchingAccountNames
};
