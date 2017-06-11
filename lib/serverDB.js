var db = require('./serverPGDB.js'); //TODO: abstract this out?
var Tables = require('./serverDBTables.js');
let Utility = require('./utility.js');

//returns promise
function query(msg){
  return db.query(msg);
}

function doSingle(q, postFn){
  if (postFn == undefined){postFn = ()=>{};}
  return new Promise((resolve, reject)=>{
    query(q)
    .then(()=>{
      postFn();
      resolve();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
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
      Utility.logError(e);
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
      Utility.logError(e);
    });
  });
}

//calls the argument callback on success
//returns promise
function initialise(onSuccess){
  return new Promise((resolve, reject)=>{
    if (!db.isConnected()){
      Utility.log('serverDB:initialise');
      db.connect().then(function(){
        Utility.log('serverDB: connected');
        let queries = Tables.getTableQueries();
        return Promise.all(queries.map((q)=>{
          db.query(q)
          .catch(function(e){
            Utility.logError(e);
          });
        }));
      }).catch(function(e){
        Utility.logError(e);
      });
    } else {
      Utility.logWarning('serverDB: is already connected!');
      resolve();
    }
  });
}

module.exports =
{
  initialise:initialise,
  query:query,
  getMany : getMany,
  getSingle : getSingle,
  doSingle : doSingle
};
