//TODO: update to pooling

var pg = require('pg');

var localConfig;
try {
  localConfig = require('./db_config/db_config.js');
} catch (e) {
  console.log('couldnt load local database configuration, must use production config');
}

var PGclient;
var connected;

//calls done(true/false) to report if database connected successfully
function connect(_done){
  pg.connect(process.env.DATABASE_URL || localConfig.config,
     function(err, client, done) {
      PGclient = client;
      client.query("SELECT 1 from pg_database WHERE datname='abc'",
        function(err, result) {
          done();
          if (err){
            throw new Error(err);
            _done(false);
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
function query(query, done){
  PGclient.query(query,function(err, result){

    if (true){
      console.log("Ran query :",query);
      if (result && result.rows){
        console.log("Returned ", result.rows.length, "rows");
      }
      //console.log("result: ",result);
      if (result && result.rows){
        //console.log("result.rows: ",result.rows);
      }
      if (result && result.rows && result.rows[0]){
        //console.log("result.rows[0]: ",result.rows[0]);
      }
    }
    if (err){
      if (localConfig){
        console.error(err);
      }
      else {
        throw new Error(err);
      }
      done(false);
    }
    else{
      done(result);
    }

  })
}

module.exports =
{
  connect:connect,
  isConnected:isConnected,
  query:query
};
