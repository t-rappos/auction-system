let getAccountModel = require('../serverDB.js').getAccount;
let Utility = require('../utility.js');
let Promise = require('bluebird');

let loggedInUsernames = []; 
let loggedInSockets = []; 

function logOut(socket){
    let index = loggedInSockets.indexOf(socket);
    let found = index !== -1;
    if(found){
        loggedInUsernames.splice(index,1);
        loggedInSockets.splice(index,1);
    }
    console.log("logged out users: " + loggedInUsernames.length);
    return found;
}

function logIn(username, password, socket){
    return new Promise((resolve, reject)=>{
        getAccountModel().findOne({where : {username : username}})
        .then((account)=>{
            let accountValid = false;
            let passwordValid = false;
            accountValid = account != null && account != undefined;
            passwordValid = accountValid && account.password === password;
            if(passwordValid){
                loggedInSockets.push(socket);
                loggedInUsernames.push(username);
                console.log("logged in users: " + loggedInUsernames.length);
            } else {
                console.log('loggin error: ' + username);
            }
            resolve(passwordValid);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

module.exports={
    logIn : logIn,
    logOut : logOut
};
