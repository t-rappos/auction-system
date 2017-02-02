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

var PGclient;
var connected;

//calls done(true/false) to report if database connected successfully
function connect(_done){
  let localConfigStr = '';
  if (localConfig && localConfig.config){
    localConfigStr = localConfig.config;
  }
  pg.connect(process.env.DATABASE_URL || localConfigStr,
     function(err, client, done) {
      PGclient = client;
      client.query("SELECT 1 from pg_database WHERE datname='abc'",
        function(err, result) {
          done();
          if (err){
            _done(false);
            throw new Error(err);
          }
          else{
            connected = true;
            _done(true);
          }
      });
    });
}

function isConnected(){
  return connected;
}

//calls the argument callback with result, if error, calls with false
function query(q3, done){
  if(!PGclient)
  {
    throw new Error("Client is null!");
  }
  PGclient.query(q3,function(err, result){

    debug.log("Ran query :",q3);
    if (result && result.rows){
      debug.log("Returned ", result.rows.length, "rows");
    }
    //debug.log("result: ",result);
    if (result && result.rows){
      //debug.log("result.rows: ",result.rows);
    }
    if (result && result.rows && result.rows[0]){
      //debug.log("result.rows[0]: ",result.rows[0]);
    }

    if (err){
      var errStr = err+"";
      if(errStr.match(/socket/)){
        //TODO: fix this, THIS OCCURS WHEN A NEW USER VISITS THE PAGE
        debug.log("Socket Error Detected: Resending query");
        connect(function(res){
          if(res){
            query(q3,done);
          }
        });
      }
      else
      {
        if (localConfig){
          console.error(err);
        }
        else {
          throw new Error(err);
        }
      }
      done(false);
    }
    else{
      done(result);
    }

  });
}

module.exports =
{
  connect:connect,
  isConnected:isConnected,
  query:query
};
