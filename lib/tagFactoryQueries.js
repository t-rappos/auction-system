function createTag(name){
  return "INSERT INTO tag (name) VALUES ('"+name+"') ON CONFLICT DO NOTHING RETURNING *;";
}

function getTag(name){
  return "SELECT * FROM tag WHERE name = '"+name+"';";
}

function getAllTags(){
  return "SELECT * FROM tag;";
}

function removeTag(name){
  return "DELETE FROM tag WHERE name = '"+name+"';";
}

function removeAllTags(){
  return "DELETE FROM tag WHERE 1=1;";
}

function createTagValue(tagId, itemId, value){
  return "INSERT INTO tag_value (tag_id, item_id, value) VALUES\
  ('"+tagId+"', '"+itemId+"', '"+value+"') ON CONFLICT DO NOTHING RETURNING *;";
}

function getTagValue(tagId, itemId){
  return "SELECT * FROM tag_value tv \
  INNER JOIN tag t \
  ON tv.tag_id = t.id \
  WHERE tag_id = '"+tagId+"' AND item_id = '"+itemId+"';";
}

function setTagValueValue(tagId, itemId, value){
  return "UPDATE tag_value SET value = '"+value+"' WHERE tag_id = '"+tagId+"' AND item_id = '"+itemId+"';";
}

function getAllTagValues(){
  return "SELECT * FROM tag_value tv \
  INNER JOIN tag t \
  ON tv.tag_id = t.id ;";
}

function getItemTagValues(itemId){
  return "SELECT * FROM tag_value tv \
  INNER JOIN tag t \
  ON tv.tag_id = t.id \
  WHERE item_id = '"+itemId+"';";
}

function removeTagValue(tagId, itemId){
  return "DELETE FROM tag_value WHERE tag_id = '"+tagId+"' AND item_id = '"+itemId+"';";
}

function removeAllTagValues(){
  return "DELETE FROM tag_value WHERE 1=1;";
}

function removeAllItemTagValues(itemId){
  return "DELETE FROM tag_value WHERE item_id = '"+itemId+"';";
}

module.exports = {
  createTag : createTag,
  getTag : getTag,
  getAllTags : getAllTags,
  removeTag : removeTag,
  removeAllTags : removeAllTags,
  createTagValue : createTagValue,
  setTagValueValue : setTagValueValue,
  getTagValue : getTagValue,
  getAllTagValues : getAllTagValues,
  getItemTagValues : getItemTagValues,
  removeTagValue : removeTagValue,
  removeAllTagValues : removeAllTagValues,
  removeAllItemTagValues : removeAllItemTagValues
};
