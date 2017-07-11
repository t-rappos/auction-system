let getItemModel = require('../serverDB.js').getItem;
let getImageModel = require('../serverDB.js').getImage;
//let Utility = require('../utility.js');

function createItem(imageId, name, desc, tagValues/*<-- TODO: remove this*/, ownerId){

  return getItemModel().create({
      name: name, 
      description: desc, 
      creation_date: new Date(),
      accountId : ownerId, 
      imageId : imageId
    });
}

function createTestItem(name, description, id, ownerId){
    return getItemModel().create({
        id: id,
        name: name, 
        description: description, 
        creation_date: new Date(),
        accountId : ownerId, 
        imageId : null
    });
}

function createImage(name, url){
    return getImageModel().create({name: name, url: url});
}

function getImageList(){
    return getImageModel().findAll({where:{}});
}

function getAccountItems(playerId){
    return getItemModel().findAll({where:{accountId:playerId}});
}

function removeAllItems(){
    return getItemModel().destroy({where:{}});
}

function removeAllImages(){
    return getImageModel().destroy({where:{}});
}

function removeItem(itemId){
    return getItemModel().destroy({where:{id : itemId}});
}

module.exports = {
    removeItem : removeItem,
    createItem : createItem,
    createImage : createImage,
    createTestItem : createTestItem,
    getImageList : getImageList,
    getAccountItems : getAccountItems,
    removeAllItems : removeAllItems,
    removeAllImages : removeAllImages
};