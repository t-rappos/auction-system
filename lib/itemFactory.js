let DB = require('./serverDB.js');
let Item = require('./item.js');
let Queries = require('./itemFactoryQueries.js');


//createItem(name, description, creationDate, imageId, ownerId)
function createItem(name, description, imageUrl, ownerId){
  return new Promise((resolve, reject)=>{
    //TODO: convert imageURL to imageID
    let imageId = 0;
    DB.query("INSERT INTO image (id, url, name) VALUES (0, 'url', 'name') ON CONFLICT DO NOTHING;")
    .then(()=>{
      return DB.query(Queries.createItem(name, description, imageId, ownerId));
    })
    .then(function(result){
      if (result && result.rows && result.rows.length > 0){
        resolve(getItem(result.rows[0].id)/*item id*/);
      }else{
        resolve(null);
      }
    })
    .catch(function(error){
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
  let item = new Item.Item(id, name, desc, /*imgaeURL*/imageId);
  return item;
}

//getItem
function getItem(itemId){
  //TODO: probs need to get item image url here too
  return new Promise((resolve, reject)=>{
    let query = DB.query(Queries.getItem(itemId));
    query.then(function(result){
      if (result && result.rows && result.rows.length > 0){
        let item = fillItem(result.rows[0])/*item id*/;
        resolve(item);
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
    DB.query(Queries.removeItem(item.getId()))
    .then(function(result){
      resolve();
      //TODO: destroy this classes members; e.g. item.destroy();
    })
    .catch(function(error){
      reject(error);
    });
  });
}

//getAllItems
function getAllItems(){
  return new Promise((resolve, reject)=>{
    let items = [];
    DB.query(Queries.getAllItems())
    .then(function(result){
      if (result.rows.length > 0){
        result.rows.map((row)=>{
          items.push(fillItem(row));
        });
      }
      resolve(items);
    })
    .catch(function(error){
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
      result.rows.map((row)=>{
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