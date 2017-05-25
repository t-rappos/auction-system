let Queries = require('./tagFactoryQueries.js');
let DB = require('./serverDB.js');
let Tag = require('./tag.js');
let TagValue = require('./tagValue.js');

function createTag(name){
  return new Promise((resolve,reject)=>{
    DB.query(Queries.createTag(name))
    .catch(function(error){
      console.log('createTag: a2 failed creating tag, error : ', error);
    })
    .then(()=>{
      return DB.query(Queries.getTag(name));
    })
    .then((result)=>{
      if (result && result.rows && result.rows.length > 0){
        let tag = new Tag.Tag(result.rows[0].id, result.rows[0].name);
        resolve(tag);
      }else{
        resolve(null);
      }
    })
    .catch(function(error){
      reject(error);
    });
  });
}

function getTag(name){
  return new Promise((resolve,reject)=>{
    DB.query(Queries.getTag(name)).then((result)=>{
      if (result && result.rows && result.rows.length > 0){
        let tag = new Tag.Tag(result.rows[0].id, result.rows[0].name);
        resolve(tag);
      }else{
        resolve(null);
      }
    })
    .catch(function(error){
      reject(error);
    });
  });
}

function getAllTags(){
  return new Promise((resolve,reject)=>{
    let tags = [];
    DB.query(Queries.getAllTags())
    .then((result)=>{
      if(result.rows.length > 0){
        result.rows.map((row)=>{
          tags.push(new Tag.Tag(row.id, row.name));
        });
      }
      resolve(tags);
    })
    .catch((err)=>{
      reject(err);
    });
  });
}

function removeTag(tag){
  return new Promise((resolve, reject)=>{
    resolve(DB.query(Queries.removeTag(tag.getName())));
  });
}

function removeAllTags(){
  return new Promise((resolve, reject)=>{
    resolve(DB.query(Queries.removeAllTags()));
  });
}

function refreshTagValue(oldTagValue){
  return new Promise((resolve,reject)=>{
    getTagValue(oldTagValue.getTagId(), oldTagValue.getItemId())
    .then(function(tagValue){
      oldTagValue.shallowCopy(tagValue);
      resolve();
    }).catch(function(error){
      reject(error);
    });
  });
}

function _changeTagValueValue(tagValue, value){
  return new Promise((resolve,reject)=>{
    if (typeof tagValue != 'object'){reject( new Error('Expected tagValue to be object not :' + (typeof tagValue)));}
    let query = DB.query(
      Queries.setTagValueValue(tagValue.getTagId(), tagValue.getItemId() ,value)
    );
    query.then(function(){
        refreshTagValue(tagValue).then(function(){
        resolve();
      });
    });
    query.catch(function(error){
      reject(error);
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
  return new Promise((resolve, reject)=>{
    DB.query(Queries.createTagValue(tagId, itemId, value))
    .then(()=>{
      return DB.query(Queries.getTagValue(tagId, itemId));
    })
    .then((res)=>{
      if(res.rows.length > 0){
        resolve(fillTagValue(res.rows[0]));
      } else {
        reject('couldnt find tag value for ' + tagId + " , " + itemId);
      }
    }).catch((err)=>{
      reject(err);
    });
  });
}

function getTagValue(tagId, itemId){
  return new Promise((resolve, reject)=>{
    DB.query(Queries.getTagValue(tagId, itemId))
    .then((res)=>{
      if(res.rows.length > 0){
        resolve(fillTagValue(res.rows[0]));
      } else {
        reject('couldnt find tag value for ' + tagId + " , " + itemId);
      }
    })
    .catch((err)=>{
      reject(err);
    });
  });
}

function getAllTagValues(){
  return new Promise((resolve,reject)=>{
    let tagValues = [];
    DB.query(Queries.getAllTagValues())
    .then((result)=>{
      if(result.rows.length > 0){
        result.rows.map((row)=>{
          tagValues.push(fillTagValue(row));
        });
      }
      resolve(tagValues);
    })
    .catch((err)=>{
      reject(err);
    });
  });
}

function getItemTagValues(itemId){
  return new Promise((resolve,reject)=>{
    let tagValues = [];
    DB.query(Queries.getItemTagValues(itemId))
    .then((result)=>{
      if(result.rows.length > 0){
        result.rows.map((row)=>{
          tagValues.push(fillTagValue(row));
        });
      }
      resolve(tagValues);
    })
    .catch((err)=>{
      reject(err);
    });
  });
}

function removeTagValue(tagId, itemId){
  return new Promise((resolve, reject)=>{
    resolve(DB.query(Queries.removeTagValue(tagId, itemId)));
  });
}

function removeAllTagValues(){
  return new Promise((resolve, reject)=>{
    resolve(DB.query(Queries.removeAllTagValues()));
  });
}

function removeAllItemTagValues(itemId){
  return new Promise((resolve, reject)=>{
    resolve(DB.query(Queries.removeAllItemTagValues(itemId)));
  });
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
