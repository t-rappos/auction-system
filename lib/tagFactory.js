let Queries = require('./messageFactoryQueries.js');
let DB = require('./serverDB.js');
let Tag = require('./tag.js');
let TagValue = require('./tagValue.js');

function createTag(name){
  return null;
}

function getTag(name){
  return null;
}

function getTags(){
  return null;
}

function deleteTag(tag){

}

function deleteAllTags(){

}

function createTagValue(tagId, itemId, value){

}

function getTagValue(tagId, itemId){
  return null;
}

function getAllTagValues(){
  return null;
}

function getItemTagValues(itemId){
  return null;
}

function removeTagValue(tagId, itemId){

}

function removeAllTagValues(){

}

function removeAllItemTagValues(itemId){

}

module.exports = {
  createTag : createTag,
  getTag : getTag,
  getTags : getTags,
  deleteTag : deleteTag,
  deleteAllTags : deleteAllTags,
  createTagValue : createTagValue,
  getTagValue : getTagValue,
  getAllTagValues : getAllTagValues,
  getItemTagValues : getItemTagValues,
  removeTagValue : removeTagValue,
  removeAllTagValues : removeAllTagValues,
  removeAllItemTagValues : removeAllItemTagValues
};
