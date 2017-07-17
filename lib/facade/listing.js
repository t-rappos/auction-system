/*
get all listings
get account listings
cancel listing
    give item back to seller
    transaction.handleListingCancelled(listing details) //so we dont deal with returning money to bidders

create listing
    remove item from seller
*/

let Promise = require('bluebird');
let Utility = require('../utility.js');
let getListingModel = require('../serverDB.js').getListing;
let getTransactionModel = require('../serverDB.js').getTransaction;
let getAccountModel = require('../serverDB.js').getAccount;
let getItemModel = require('../serverDB.js').getItem;
//let initialiseServer = require('../serverDB.js').initialise;

function getAccountBids(accountId){
    return getTransactionModel().findAll({where : {bidderId : accountId}, include : [getAccountModel(), {model:getListingModel(), include:[getItemModel()]}]});
}

function getAllListings(search){
    while(getListingModel() == 'null'){
        //do nothing
        console.log('waiting for server to initialise');
    }

    return search 
    ? getListingModel().findAll({
        where:{expiry_date :{$gt:new Date()},
            expiry_processed:false,sold:false }, 
        include: [{model : getItemModel(), where:{name : {like : '%'+search+'%'}}}]})
    :  getListingModel().findAll({
        where:{expiry_date :{$gt:new Date()},
            expiry_processed:false,
            sold:false },
        include: [getItemModel()]});
}

/*
function getAllListingsSimple(){
    return getListingModel().findAll({where:{}});
}

function getAllListingsSimpleJoined(){
    return getListingModel().findAll({where:{},include: [getItemModel()]});
}
*/

function getExpiredListings(){
    return getListingModel().findAll({where:{expiry_date :{$lte:new Date()},expiry_processed:false, sold:false }});
}

function getAccountListings(accountId, search){
    return search?
    getListingModel().findAll({
        where:{sellerId : accountId,expiry_processed:false, sold:false},
        include: [{model : getItemModel(), where:{name : {like : '%'+search+'%'}}}]})
    : getListingModel().findAll({
        where:{sellerId : accountId,expiry_processed:false, sold:false},
        include: [getItemModel()]});
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
            return [listing,giveItemBack(listing.itemId, listing.sellerId)];
        })
        .spread((listing)=>{
            return processCancelledListing(listing);
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

function createTransaction(amount, bidderId, listingId ){
    return getTransactionModel().create({
        amount : amount,
        creation_date : new Date(),
        bidderId : bidderId,
        listingId : listingId
    });
}

function removeAllTransactions(){
    return getTransactionModel().destroy({where:{}});
}

/* Transaction Facade TODO: refactor?*/
function processCancelledListing(listing){
    //TODO: make sure we can't cancel a listing twice
    //{ atomic
    //give item back to lister
    //give money back to last bidder
    //set listing to expired
    //}
    return new Promise((resolve, reject)=>{
        Promise.all([
            getHighestBidderTransaction(listing.id),
            giveItemBack(listing.itemId, listing.sellerId)
        ])
        .spread((highTrans,res)=>{
            if(highTrans!=null){
                return addMoneyTo(highTrans.bidderId, highTrans.amount);
            } else {
                return new Promise((res, rej)=>{res();});
            }
        })
        .then(()=>{
            return setListingExpired(listing.id);
        })
        .then(()=>{
            resolve();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

//TODO: make listings expire!!
/* we can check every second */

function processAllExpiredListings(){
    return new Promise((resolve, reject)=>{
        getExpiredListings()
        .then((listings)=>{
            console.log('expired listings : ' + listings.length);
            let actions = [];
            listings.map((listing)=>{
                actions.push(processExpiredListing(listing));
            });
            return Promise.all(actions);
        })
        .then(()=>{resolve();})
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

//initialiseServer()
//.then(()=>{
    /*let expiredListingHandlerId = */setInterval(()=>{processAllExpiredListings();},5000);
//});

function processExpiredListing(listing){
    //TODO: make sure we cant cancel an expired listing
    //{atomic
    //if it was bid on
        //set listing to sold
        //add money to seller
        //transfer to buyer
    //else
        //set to expired
        //transfer to seller
    //}
    return new Promise((resolve, reject)=>{
        getHighestBidderTransaction(listing.id)
        .then((maxTrans)=>{
            if(maxTrans!=null){
                return Promise.all([
                    setListingSold(listing.id),
                    addMoneyTo(listing.sellerId, maxTrans.amount),
                    giveItemBack(listing.itemId, maxTrans.bidderId)
                ]);
            } else {
                return Promise.all([
                    setListingExpired(listing.id),
                    giveItemBack(listing.itemId, listing.sellerId)
                ]);
            }
        })
        .then(()=>{
            resolve();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

function getListingsMaxBids(listings){
    return new Promise((resolve, reject)=>{
        let maxBids = [];
        if(!listings || listings.length === 0){
            resolve([]);
        }
        let actions = [];
        listings.map((listing)=>{
            actions.push(getHighestBidderTransaction(listing.id)
                        .then((trans)=>{
                            maxBids.push(trans);
                        }));
        });
    
        Promise.all(actions)
        .then(()=>{
            resolve(maxBids);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

function getHighestBidderTransaction(listingId){
    return getTransactionModel().findOne({where : {listingId : listingId}, order:[['amount','DESC']] });
}

//amount can be null for buyouts
function validateTransactionRequest(bidderId/*or buyerId*/, listingId, amount){
    return new Promise((resolve, reject)=>{
        Promise.all([
            getAccountModel().findOne({where : {id : bidderId}}),
            getListingModel().findOne({where: {id : listingId}}),
            getHighestBidderTransaction(listingId)
        ])
        .spread((bidderAccount, listing, maxBidderTransaction)=>{
            let isBuyout = false;
            if(amount == null || amount == undefined){
                amount = listing.starting_price;
                isBuyout = true;
            } 
            let bidderMoney = bidderAccount.money;
            let maxBid = maxBidderTransaction!==null ? maxBidderTransaction.amount : listing.starting_price;
            if(isBuyout){maxBid-=0.001;}
            let valid = (bidderMoney >= amount) && (amount > maxBid);
            resolve([valid,maxBidderTransaction, listing, amount]);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

function addMoneyTo(accountId, amount){
    return new Promise((resolve, reject)=>{
       if(accountId == undefined || accountId == null){
            resolve(); //do nothing if no account id was given
       }
       getAccountModel().increment('money', {by: amount, where:{id : accountId}})
       .then((res)=>{
            resolve(res);
       })
       .catch((e)=>{
           Utility.logError(e);
       });
    });
}

//TODO: make these functions atomic transactions
function bidOnListing(bidderId, listingId, amount){
    return new Promise((resolve, reject)=>{
        validateTransactionRequest(bidderId, listingId, amount)
        .spread((valid, maxBidTransaction)=>{
            if(!valid){
                Utility.logError('bid request not valid');
            }
            return Promise.all([
                createTransaction(amount, bidderId, listingId),
                addMoneyTo(bidderId, -1*amount),
                addMoneyTo(maxBidTransaction?maxBidTransaction.bidderId:null, maxBidTransaction?maxBidTransaction.amount:0)
            ]);
        })
        .spread((transaction)=>{
            resolve(transaction);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}

function setListingSold(listingId){
    return getListingModel().update({sold : true}, {where:{id : listingId}});
}
function setListingExpired(listingId){
    return getListingModel().update({expiry_processed : true},{ where :{id : listingId}});
}


function buyoutListing(buyerId, listingId){
    return new Promise((resolve, reject)=>{
        validateTransactionRequest(buyerId, listingId, null)
        .spread((valid, maxBidTransaction , listing, amount)=>{
            if(!valid){
                Utility.logError('bid request not valid');
            }
            return Promise.all([
                setListingSold(listingId),
                createTransaction(amount, buyerId, listingId),
                addMoneyTo(buyerId, -1*amount),
                addMoneyTo(listing.sellerId, amount),
                giveItemBack(listing.itemId, buyerId)
            ]);
        })
        .then((res)=>{
            resolve(res[1]/*transaction*/);
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
}


module.exports = {
    getAccountBids : getAccountBids,
    getListingsMaxBids : getListingsMaxBids,
    //getAllListingsSimple : getAllListingsSimple,
    //getAllListingsSimpleJoined : getAllListingsSimpleJoined,
    getAllListings : getAllListings,
    getAccountListings : getAccountListings,
    removeAllTransactions : removeAllTransactions,
    cancelListing : cancelListing,
    createListing : createListing,
    bidOnListing : bidOnListing,
    buyoutListing : buyoutListing
};