// @flow

let getAccountModel = require('../serverDB.js').getAccount;
let Utility = require('../utility.js');
let Promise = require('bluebird');

let loggedInIds: Array<number> = [];
let loggedInUsernames: Array<string> = []; 
let loggedInSockets:Array<{}> = []; 

function logOut(socket: {} ){
    let index = loggedInSockets.indexOf(socket);
    let found = index !== -1;
    if(found){
        loggedInUsernames.splice(index,1);
        loggedInSockets.splice(index,1);
    }
    console.log("logged out users: " + loggedInUsernames.length);
    return found;
}

function getUsername(socket: {}){
    let index = loggedInSockets.indexOf(socket);
    if(index != -1){
        return loggedInUsernames[index];
    } else {
        return null;
    }
}

function getId(socket: {}){
    let index = loggedInSockets.indexOf(socket);
    if(index != -1){
        return loggedInIds[index];
    } else {
        return null;
    }
}

function getSocket(accountId: number): ?{}{
    let index = loggedInIds.indexOf(accountId);
    if(index !== -1){
        return loggedInSockets[index];
    } else {
        return null;
    }
}

function logIn(username: string, password: string, socket: {}){
    return new Promise((resolve, reject)=>{
        loggedInIds.push(5);
        loggedInSockets.push(socket);
        loggedInUsernames.push(username);
        resolve({passwordValid : true, alreadyLoggedIn : true});
/*
        getAccountModel().findOne({where : {username : username}})
        .then((account)=>{
            let accountValid = false;
            let passwordValid = false;
            let alreadyLoggedIn = false;
            let sid = loggedInSockets.indexOf(socket);//throw new Error('Already logged in as ' + loggedInUsernames[sid]);
            accountValid = account != null && account != undefined;
            if(sid != -1){alreadyLoggedIn = true;}
            passwordValid = accountValid && account.password === password;
            if(passwordValid){
                loggedInIds.push(account.id);
                loggedInSockets.push(socket);
                loggedInUsernames.push(username);
                console.log("logged in users: " + loggedInUsernames.length);
            } else {
                console.log('loggin error: ' + username);
            }
            resolve({passwordValid : passwordValid, alreadyLoggedIn : alreadyLoggedIn});
        })
        .catch((e)=>{
            Utility.logError(e);
        });
*/


    });
}

module.exports={
    logIn : logIn,
    logOut : logOut,
    getUsername : getUsername,
    getId : getId,
    getSocket : getSocket
};
