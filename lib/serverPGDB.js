//TODO: update to pooling

//var pg = require('pg');
var Utility = require('./utility.js');
var Sequelize = require('sequelize');
var sequelize = null;
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

//let PGclient;
let connected;
let disconnectFn;


function s(){
  if(sequelize == null){throw new Error("sequelize is null!!");}
  else {
    return sequelize;
  }
}
//dialectOptions.ssl=true 
//returns a promise to connect to database
function connect(){
  return new Promise((resolve,reject)=>{
    let localConfigStr = '';
    if (localConfig && localConfig.config){
      localConfigStr = localConfig.config;
    }
    Utility.log('serverPGDB: ',process.env.DATABASE_URL || localConfigStr, ' about to connect to pg');
    sequelize = new Sequelize(process.env.DATABASE_URL || localConfigStr, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
      }
    });
    sequelize.authenticate()
    .then(()=>{
      connected = true;
      console.log('Connection has been established successfully.');
      resolve();
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      throw(err);
    });
  });
}

function disconnect(){
  disconnectFn();
}

function isConnected(){
  return connected;
}

module.exports =
{
  s : s,
  connect:connect,
  isConnected:isConnected,
  disconnect:disconnect
};
