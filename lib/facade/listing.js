/*
get all listings
get account listings
cancel listing
    give item back to seller
    transaction.handleListingCancelled(listing details) //so we dont deal with returning money to bidders

create listing
    remove item from seller
*/

let Utility = require('../utility.js');
let getListingModel = require('../serverDB.js').getListing;
let getItemModel = require('../serverDB.js').getItem;

let cancelListingHandler = ()=>{return new Promise((resolve,reject)=>{resolve();});};

function setCancelListingHandler(fn){cancelListingHandler = fn;}

function getAllListings(){
    return getListingModel().findAll({where:{}});
}

function getAccountListings(accountId){
    return getListingModel().findAll({where:{sellerId : accountId}});
}

function removeListing(listingId){
    return getListingModel().destroy({where:{id : listingId}});
}

function holdItem(itemId){
    //update item ownerId to null;
    return getItemModel().update(
        {accountId : null},
        {where:{id:itemId}}
    );
}

function giveItemBack(itemId, ownerId){
    //update item ownerId to ...
    return getItemModel().update(
        {accountId : ownerId},
        {where:{id:itemId}}
    );
}

function getListing(listingId){
    return getListingModel().findOne({where:{id : listingId}});
}

function cancelListing(listingId){
    return new Promise((resolve, reject)=>{
        getListing(listingId)
        .then((listing)=>{
            return giveItemBack(listing.itemId, listing.sellerId);
        })
        .then(()=>{
            return cancelListingHandler(listingId);
        })
        .then(()=>{
            return removeListing(listingId); //remove from db
        })
        .then(()=>{
            resolve();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

//duration in ms
function createListing(itemId, startPrice, listingDuration, listingType, sellerId){
    return new Promise((resolve, reject)=>{
        let listing = null;
        let endDate = new Date();
        endDate.setTime(endDate.getTime() + listingDuration);
        getListingModel().create({ //add to db
            type : listingType, 
            starting_price : startPrice,
            expiry_date : endDate,
            creation_date : new Date(),
            itemId : itemId,
            sellerId : sellerId
        })
        .then((res)=>{
            listing = res;
            return holdItem(listing.itemId); //take item from player
        })
        .then(()=>{
            resolve(listing);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

module.exports = {
    getAllListings : getAllListings,
    getAccountListings : getAccountListings,
    setCancelListingHandler : setCancelListingHandler,
    cancelListing : cancelListing,
    createListing : createListing
};