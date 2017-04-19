

//Note: also returns id of created item
function createItem(name, description, creationDate, imageId, ownerId){
  let query = 'INSERT INTO item (name, description, creation_date, owner_id, image_id)\
   values ("'+name+'", "'+description+'", '+creationDate+', '+ownerId+', '+imageId+') RETURNING id;';
  return query;
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
  createItem : createItem,
  removeItem : removeItem,
  getItem : getItem,
  getAllItems : getAllItems,
  removeAllItems : removeAllItems,
  getAccountItems : getAccountItems
};
