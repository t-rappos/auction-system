var db = require('./serverPGDB.js'); //TODO: abstract this out?
//var debug = require('./logger.js');

//returns promise
function query(msg){
  return db.query(msg);
}

//calls the argument callback on success
//returns promise
function initialise(onSuccess){
  return new Promise((resolve, reject)=>{
    if (!db.isConnected()){
      console.log('serverDB:initialise');
      db.connect().then(function(){
        console.log('serverDB: connected');
        resolve();
      }).catch(function(error){
        console.log('serverDB: didnt connect', error);
        reject(error);
        throw(error);
      });
    } else {
      console.log('serverDB: is already connected!');
      resolve();
    }
  });
}

module.exports =
{
  initialise:initialise,
  query:query
};
