let DB = require('./serverDB.js');
let Item = require('./item.js');
let Queries = require('./itemFactoryQueries.js');
let TagQueries = require('./tagFactoryQueries.js');
let ListingQueries = require('./listingFactoryQueries.js');
let Utility = require('./utility.js');
let TagFactory = require('./tagFactory.js');

function createItem(name, description, imageUrl, ownerId){
  return new Promise((resolve, reject)=>{
    let imageId = 0;
    //TODO: can we do this double insert query in a single query instead?
    DB.query(Queries.createImage(imageUrl, name))
    .then((result)=>{
      if(result && result.rows && result.rows.length > 0){
        imageId = result.rows[0].id;
        resolve(DB.getSingle(Queries.createItem(name, description, imageId, ownerId), fillItem));
      }
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });
}

function fillItem(row){
  let id = row.id;
  let name = row.name;
  let desc = row.description;
  let imageId = row.image_id;
  let item = new Item.Item(id, name, desc, imageId);
  return item;
}

function removeItem(item){
  return new Promise((resolve, reject)=>{
    DB.query(Queries.removeItem(item.getId()))
    .then(()=>{return TagFactory.removeAllItemTagValues(item.getId()); })
    .then(()=>{resolve(); })
    .catch(function(e){
      Utility.logError(e);
    });
  });
}

function getAllItems(){
  return DB.getMany(Queries.getAllItems(), fillItem);
}

function removeAllItems(){
  return new Promise((resolve, reject)=>{
    let tagQuery = DB.query(TagQueries.removeAllTagValues());
    let lqq = ListingQueries.cancelAllListings();
    let lq = [DB.query(lqq[0]),DB.query(lqq[1])];
    let query = DB.query(Queries.removeAllItems());

    lq[0]
    .then(lq[1])
    .then(tagQuery)
    .then(query)
    .then(()=>{resolve();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

function disownItem(itemId){
  return DB.doSingle(Queries.disownItem(itemId));
}

function transferItem(itemId, toOwnerId){
  return DB.doSingle(Queries.setItemOwner(itemId, toOwnerId));
}

function getAccountItems(ownerId){
  return DB.getMany(Queries.getAccountItems(ownerId), fillItem);
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
