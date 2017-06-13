let Queries = require('./tagFactoryQueries.js');
let DB = require('./serverDB.js');
let Tag = require('./tag.js');
let TagValue = require('./tagValue.js');
let Utility = require('./utility.js');

function fillTag(row){
    return new Tag.Tag(row.id, row.name);
}

function createTag(name){
  return DB.getSingle(Queries.createTag(name),fillTag);
}

function getTag(name){
  return DB.getSingle(Queries.getTag(name), fillTag);
}

function getAllTags(){
  return DB.getMany(Queries.getAllTags(), fillTag);
}

function removeTag(tag){
  return DB.query(Queries.removeTag(tag.getName()));
}

function removeAllTags(){
  return DB.query(Queries.removeAllTags());
}

function refreshTagValue(oldTagValue){
  return new Promise((resolve,reject)=>{
    getTagValue(oldTagValue.getTagId(), oldTagValue.getItemId())
    .then(function(tagValue){
      oldTagValue.shallowCopy(tagValue);
      resolve();
    }).catch((e)=>{
      Utility.logError(e);
    });
  });
}

function _changeTagValueValue(tagValue, value){
  return new Promise((resolve,reject)=>{
    if (typeof tagValue != 'object'){reject( new Error('Expected tagValue to be object not :' + (typeof tagValue)));}
    DB.query(Queries.setTagValueValue(tagValue.getTagId(), tagValue.getItemId() ,value))
    .then(()=> refreshTagValue(tagValue))
    .then(resolve)
    .catch(function(error){
      Utility.logError(error);
    });
  });
}

function fillTagValue(row){
  let tagId = row.tag_id;
  let itemId = row.item_id;
  let value = row.value;
  let name = row.name;
  let tagValue = new TagValue.TagValue(tagId, itemId, value, name);
  tagValue._changeValueFn = _changeTagValueValue.bind(null, tagValue);
  return tagValue;
}

function createTagValue(tagId, itemId, value){
  return DB.getSingle(Queries.createTagValue(tagId, itemId, value), fillTagValue);
}

function getTagValue(tagId, itemId){
  return DB.getSingle(Queries.getTagValue(tagId, itemId), fillTagValue);
}

function getAllTagValues(){
  return DB.getMany(Queries.getAllTagValues(), fillTagValue);
}

function getItemTagValues(itemId){
  return DB.getMany(Queries.getItemTagValues(itemId), fillTagValue);
}

function removeTagValue(tagId, itemId){
  return DB.query(Queries.removeTagValue(tagId, itemId));
}

function removeAllTagValues(){
  return DB.query(Queries.removeAllTagValues());
}

function removeAllItemTagValues(itemId){
  return DB.query(Queries.removeAllItemTagValues(itemId));
}

module.exports = {
  createTag : createTag,
  getTag : getTag,
  getAllTags : getAllTags,
  removeTag : removeTag,
  removeAllTags : removeAllTags,
  createTagValue : createTagValue,
  getTagValue : getTagValue,
  getAllTagValues : getAllTagValues,
  getItemTagValues : getItemTagValues,
  removeTagValue : removeTagValue,
  removeAllTagValues : removeAllTagValues,
  removeAllItemTagValues : removeAllItemTagValues
};
