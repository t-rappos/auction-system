let DB = require('./serverDB.js');
let Item = require('./item.js');
let Queries = require('./itemFactoryQueries.js');

//createItem(name, description, creationDate, imageId, ownerId)
function createItem(name, description, creationDate, imageId, ownerId){
  return new Promise((resolve, reject)=>{
    let query = DB.Query(Queries.createItem(name, description, creationDate, imageId, ownerId));
    query.then(function(result){
      if (result && result.rows && result.rows.length > 0){
        console.log('item id = ', result.rows[0]);
        resolve(getItem(result.rows[0])/*item id*/);
      }
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

function fillItem(row){
  let id = row.id;
  let name = row.name;
  let desc = row.description;
  //let cdate = row.creation_date;
  //let ownerId = row.owner_id;
  let imageId = row.image_id;
  let item = Item.Item(id, name, desc, /*imgaeURL*/imageId);
  return item;
}

//getItem
function getItem(itemId){
  //TODO: probs need to get item image url here too
  return new Promise((resolve, reject)=>{
    let query = DB.query(Queries.getItem(itemId));
    query.then(function(result){
      if (result && result.rows && result.rows.length > 0){
        console.log('item id = ', result.rows[0]);
        resolve(fillItem(result.rows[0])/*item id*/);
      } else {
        resolve(null);
      }
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

//removeItem(item)
function removeItem(item){
  return new Promise((resolve, reject)=>{
    let query = DB.query(Queries.removeItem(item.getId()));
    query.then(function(result){
      resolve();
      //TODO: destroy this classes members; e.g. item.destroy();
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

//getAllItems
function getAllItems(){
  return new Promise((resolve, reject)=>{
    let query = DB.query(Queries.getAllItems());
    let items = [];
    query.then(function(result){
      result.rows.maps((row)=>{
        items.push(fillItem(row));
      });
      resolve(items);
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

//removeAllItems
function removeAllItems(){
  return new Promise((resolve, reject)=>{
    let query = DB.query(Queries.removeAllItems());
    resolve(query);
  });
}

//getAccountItems
function getAccountItems(ownerId){
  return new Promise((resolve, reject)=>{
    let query = DB.query(Queries.getAccountItems(ownerId));
    let items = [];
    query.then(function(result){
      result.rows.maps((row)=>{
        items.push(fillItem(row));
      });
      resolve(items);
    });
    query.catch(function(error){
      reject(error);
    });
  });
}

module.exports = {
  createItem : createItem,
  removeAllItems : removeAllItems,
  removeItem: removeItem,
  getAllItems: getAllItems,
  getAccountItems : getAccountItems
};
