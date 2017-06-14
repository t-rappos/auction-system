let DB = require('./serverDB.js');
let Item = require('./item.js');
let Queries = require('./itemFactoryQueries.js');
let Utility = require('./utility.js');
let TagFactory = require('./tagFactory.js');
let UtilData = require('./utilData.js');

function createImage(name, url){
  return DB.doSingle(Queries.createImage(url,name));
}

function getImageList(){
  return DB.getMany(Queries.getAllImages(), (row)=>{
    return row;
  });
}

function removeAllImages(){
  return UtilData.clearAllImages();
}

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
  return UtilData.clearAllItems();
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
  createImage : createImage,
  getImageList : getImageList,
  removeAllImages : removeAllImages,
  disownItem : disownItem,
  createItem : createItem,
  transferItem : transferItem,
  removeAllItems : removeAllItems,
  removeItem: removeItem,
  getAllItems: getAllItems,
  getAccountItems : getAccountItems
};
