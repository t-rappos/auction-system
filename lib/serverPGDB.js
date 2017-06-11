//TODO: update to pooling

var pg = require('pg');
var Utility = require('./utility.js');

var localConfig;

try {
  /*eslint-disable node/no-unpublished-require*/
  /*eslint-disable node/no-missing-require*/
  localConfig = require('../db_config/db_config.js');
} catch (e) {
  Utility.log('couldnt load local database configuration, must use production config');
  if (process.env.DATABASE_URL && process.env.DATABASE_URL != ''){
    Utility.log('found production config');
  } else {
    Utility.logWarning('couldnt find production config');
  }
}

let PGclient;
let connected;
let disconnectFn;

//returns a promise to connect to database
function connect(){
  return new Promise((resolve,reject)=>{
    let localConfigStr = '';
    if (localConfig && localConfig.config){
      localConfigStr = localConfig.config;
    }
    Utility.log('serverPGDB: ',process.env.DATABASE_URL || localConfigStr, ' about to connect to pg');
    pg.connect(process.env.DATABASE_URL || localConfigStr,
       function(err, client, done) {
        disconnectFn = done;
        if(err){
          reject(err);
        }
        PGclient = client;
        let dbQuery = client.query("SELECT 1 from pg_database WHERE datname='abc'");
        dbQuery.on('end',function(result){
          Utility.log('serverPGDB: connected');
          connected = true;
          resolve();
        });
        dbQuery.on('error', function(e){
          Utility.logError(e);
        });
      });
  });
}

function disconnect(){
  disconnectFn();
}

function isConnected(){
  return connected;
}

function query(q3){
  return new Promise((resolve, reject)=>{
    if(!PGclient){
      reject(new Error("Client is null"));
    }
    let dbQuery = PGclient.query(q3);

    dbQuery.on('end',function(result){
      resolve(result);
    });

    dbQuery.on('error',function(error){
      var errStr = error+"";
      if(errStr.match(/socket/)){
        Utility.logWarning("Socket Error Detected: Resending query"); //TODO: fix this, THIS OCCURS WHEN A NEW USER VISITS THE PAGE
        connect.then(function(){
          query(q3);
        }).catch(function(err){
          reject(err + " <- "+q3);
          throw(err);
        });
      } else {
        reject(error + " <- "+ q3);
      }
    });
  });
}

module.exports =
{
  connect:connect,
  isConnected:isConnected,
  query:query,
  disconnect:disconnect
};
