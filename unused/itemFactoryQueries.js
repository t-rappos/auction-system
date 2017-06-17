let Utility = require('./utility.js');

//Note: also returns id of created item
function createItem(name, description, imageId, ownerId){
  let date = new Date();
  let dateSubStr = Utility.getDateStr(date);
  let query = 'INSERT INTO item (name, description, creation_date, image_id, owner_id) VALUES ' + "('"+name+"', '"+description+"', '"+dateSubStr+"',"+imageId+","+ownerId+") RETURNING *;";
  return query;
}

function createImage(imageUrl, name){
  return "INSERT INTO image (url, name) VALUES ('"+imageUrl+"', '"+name+"') RETURNING * ;";
}

function getAllImages(){
  return "SELECT * FROM image;";
}

function removeAllImages(){
  return "DELETE FROM image WHERE 1=1;";
}

function setItemOwner(itemId, toOwnerId){
    return "UPDATE item SET owner_id = '"+toOwnerId+"' WHERE id = '"+itemId+"';";
}

function disownItem(itemId){
    return "UPDATE item SET owner_id = NULL WHERE id = '"+itemId+"';";
}

function removeItem(itemId){
  let query = "DELETE FROM item WHERE id = "+itemId+";";
  return query;
}

function getItem(itemId){
  let query = "SELECT * FROM item WHERE id = '"+itemId+"';";
  return query;
}

function getAllItems(){
  let query = "SELECT * FROM item;";
  return query;
}

function removeAllItems(){
  let query = 'DELETE FROM item WHERE 1=1;';
  return query;
}

function getAccountItems(ownerId){
  let query = 'SELECT * from item where owner_id = '+ownerId+';';
  return query;
}

module.exports = {
  removeAllImages : removeAllImages,
  createImage : createImage,
  getAllImages : getAllImages,
  disownItem : disownItem,
  createItem : createItem,
  removeItem : removeItem,
  getItem : getItem,
  getAllItems : getAllItems,
  removeAllItems : removeAllItems,
  getAccountItems : getAccountItems,
  setItemOwner : setItemOwner
};
