//TODO: update to pooling

var pg = require('pg');
var debug = require('./logger.js');

var localConfig;

try {
  /*eslint-disable node/no-unpublished-require*/
  /*eslint-disable node/no-missing-require*/
  localConfig = require('../db_config/db_config.js');
} catch (e) {
  debug.log('couldnt load local database configuration, must use production config');
  if (process.env.DATABASE_URL && process.env.DATABASE_URL != ''){
    debug.log('found production config');
  } else {
    debug.log('couldnt find production config');
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
    console.log('serverPGDB: ',process.env.DATABASE_URL || localConfigStr, ' about to connect to pg');
    pg.connect(process.env.DATABASE_URL || localConfigStr,
       function(err, client, done) {
        disconnectFn = done;
        console.log('serverPGDB: have we connected?');
        if(err){reject(err);}
        PGclient = client;

        let dbQuery = client.query("SELECT 1 from pg_database WHERE datname='abc'");
        dbQuery.on('end',function(result){
          console.log('serverPGDB: have we connected? : yes');
          connected = true;
          resolve();
        });
        dbQuery.on('error', function(error){
          console.log('serverPGDB: have we connected? : no');
          reject(error);
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

/*
function debugQueryResults(result,display){
  if (display){
    if (result && result.rows){
      debug.log("Returned ", result.rows.length, "rows");
    }
    debug.log("result: ",result);
    if (result && result.rows){
      debug.log("result.rows: ",result.rows);
    }
    if (result && result.rows && result.rows[0]){
      debug.log("result.rows[0]: ",result.rows[0]);
    }
  }
}
*/

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
        debug.log("Socket Error Detected: Resending query"); //TODO: fix this, THIS OCCURS WHEN A NEW USER VISITS THE PAGE
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
