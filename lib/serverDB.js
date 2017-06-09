var db = require('./serverPGDB.js'); //TODO: abstract this out?
var Tables = require('./serverDBTables.js');
//var assert = require('assert');
//var debug = require('./logger.js');

//returns promise
function query(msg){
  //console.log("query: "+msg);
  return db.query(msg);
}

//fillFn should take a row and return the object
//will resolve null if nothing is found
function getSingle(q, fillFn){
  return new Promise((resolve, reject)=>{
    query(q)
    .then((result)=>{
      if(result && result.rows && result.rows.length > 0){
        resolve(fillFn(result.rows[0]));
      } else {
        resolve(null);
      }
    }).catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
}

//fillFn should take a row and return the object
//will resolve [] if nothing is found
function getMany(q, fillFn){
  return new Promise((resolve, reject)=>{
    let objects = [];
    query(q)
    .then((result)=>{
      if(result && result.rows && result.rows.length > 0){
        result.rows.map((row)=>{
          objects.push(fillFn(row));
        });
      }
      resolve(objects);
    }).catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
}

//calls the argument callback on success
//returns promise
function initialise(onSuccess){
  return new Promise((resolve, reject)=>{
    if (!db.isConnected()){
      console.log('serverDB:initialise');
      db.connect().then(function(){
        console.log('serverDB: connected');
        let queries = Tables.getTableQueries();
        return Promise.all(queries.map((q)=>{
          db.query(q)
          .catch(function(e){
            console.log(e);
          });
        }));
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
  query:query,
  getMany : getMany,
  getSingle : getSingle
};
