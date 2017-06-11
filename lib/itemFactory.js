let DB = require('./serverDB.js');
let Item = require('./item.js');
let Queries = require('./itemFactoryQueries.js');
let TagQueries = require('./tagFactoryQueries.js');
let ListingQueries = require('./listingFactoryQueries.js');

//createItem(name, description, creationDate, imageId, ownerId)
function createItem(name, description, imageUrl, ownerId){
  return new Promise((resolve, reject)=>{
    //TODO: convert imageURL to imageID
    let imageId = 0;
    DB.query("INSERT INTO image (url, name) VALUES ('"+imageUrl+"', '"+name+"') RETURNING * ;")
    .then((result)=>{
      if(result && result.rows && result.rows.length > 0){
        imageId = result.rows[0].id;
        return DB.query(Queries.createItem(name, description, imageId, ownerId));
      }
    })
    .then(function(result){
      if (result && result.rows && result.rows.length > 0){
        resolve(getItem(result.rows[0].id)/*item id*/);
      }else{
        resolve(null);
      }
    })
    .catch(function(error){
      console.log(error);
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
    })
    .catch(function(error){
      console.log(error);
      reject(error);
    });
  });
}

//removeItem(item)
function removeItem(item){
  return new Promise((resolve, reject)=>{
    console.log("TODO: remove all item tag-values");
    DB.query(Queries.removeItem(item.getId()))
    .then(function(result){
      resolve();
      //TODO: destroy this classes members; e.g. item.destroy();
    })
    .catch(function(error){
      console.log(error);
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
      console.log(error);
      reject(error);
    });
  });
}

function removeAllItems(){
  return new Promise((resolve, reject)=>{
    let tagQuery = DB.query(TagQueries.removeAllTagValues());
    let lqq = ListingQueries.cancelAllListings();
    let lq = [DB.query(lqq[0]),DB.query(lqq[1])];
    let query = DB.query(Queries.removeAllItems());
    resolve(lq[0]
    .then(lq[1])
    .then(tagQuery)
    .then(query));
  });
}

function disownItem(itemId){
  return new Promise((resolve, reject)=>{
    DB.query(Queries.disownItem(itemId))
    .then(()=>{
      resolve();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
}

function transferItem(itemId, toOwnerId){
  return new Promise((resolve, reject)=>{
    DB.query(Queries.setItemOwner(itemId, toOwnerId))
    .then(()=>{
      resolve();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
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
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  disownItem : disownItem,
  createItem : createItem,
  transferItem : transferItem,
  removeAllItems : removeAllItems,
  removeItem: removeItem,
  getAllItems: getAllItems,
  getAccountItems : getAccountItems
};
