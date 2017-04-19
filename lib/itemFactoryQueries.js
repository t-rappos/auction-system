

//Note: also returns id of created item
function createItem(name, description, imageId, ownerId){
  //console.log("queries: name %s, desc %s, imageid %s, ownerid %s", name, description, imageId, ownerId);

  let date = new Date();
  let dateStr = date + "";
  let gmtIndex = dateStr.indexOf('GMT');
  let dateSubStr = dateStr.substr(0,gmtIndex);
  let query = 'INSERT INTO item (name, description, creation_date, image_id, owner_id) VALUES ' + "('"+name+"', '"+description+"', '"+dateSubStr+"',"+imageId+","+ownerId+") RETURNING id;";
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
