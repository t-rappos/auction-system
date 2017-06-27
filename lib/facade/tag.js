
/*
createItemTagValue(1337,'quality', '+1')
TagFacade.getTagEnumValues('quality')
TagFacade.getAllTags()
*/

let getTagModel = require('../serverDB.js').getTag;
let getTagValueModel = require('../serverDB.js').getTagValue;
let Utility = require('../utility.js');

function createItemTagValue(itemId, tagName, tagValue){
    return new Promise((resolve, reject)=>{
        let tagModel = getTagModel();
        let tagValueModel = getTagValueModel();

        tagModel.findCreateFind({where:{name:tagName}, defaults:{name: tagName}})
        .spread((tag,created)=>{
            return tagValueModel.create({tagId: tag.id, itemId: itemId, value: tagValue});
        })
        .then((tagValue)=>{
            resolve(tagValue);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

function getAllItemsTagValues(itemIds){
    return getTagValueModel().findAll({ where: { itemId :{ in:itemIds} }});
}

function getTagEnumValues(tagName){
    //TODO: update this to only return non-numeric values
    return new Promise((resolve, reject)=>{
        getTagModel().findOne({where : {name : tagName}})
        .then((tag)=>{
            let tagId = tag.id;
            return getTagValueModel().findAll({where : {tagId : tagId}});
        })
        .then((tagValues)=>{
            resolve(tagValues);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

function getAllTags(){
    return getTagModel().findAll({where:{}});
}

function removeAllItemTagValues(itemId){
    return getTagValueModel().destroy({where:{itemId : itemId}});
}

function removeAllTags(){
    return getTagModel().destroy({where:{}});
}

module.exports = {
    getAllItemsTagValues : getAllItemsTagValues,
    removeAllItemTagValues : removeAllItemTagValues,
    removeAllTags : removeAllTags,
    createItemTagValue : createItemTagValue,
    getTagEnumValues : getTagEnumValues, 
    getAllTags : getAllTags
};