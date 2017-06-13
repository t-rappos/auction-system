let DB = require('./serverDB.js');
let Queries = require('./transactionFactoryQueries.js');
let Transaction = require('./transaction.js');
let AccountFactory = require('./accountFactory.js');
let ListingFactory = require('./listingFactory.js');
let ItemFactory = require('./itemFactory.js');
let Utility = require('./utility.js');

function fillTransaction(row){
  Utility.assert(row, 'fillTransaction');
  return new Transaction.Transaction(row.id, Number(row.amount), row.creation_date,
    row.bidder_id, row.listing_id);
}

function createTransaction(amount, accountId, listingId){
  return DB.getSingle(Queries.createTransaction(amount, accountId, listingId), fillTransaction);
}

function getTransaction(id){
  return DB.getSingle(Queries.getTransaction(id), fillTransaction);
}

//will return null for no listings, otherwise it will return a transaction with the largest amount
function getHighestTransactionForListing(listingId){
  let query = Queries.getLastTransactions(listingId);
  return DB.getSingle(query, fillTransaction);
}

function getAllTransactions(){
  return DB.getMany(Queries.getAllTransactions(), fillTransaction);
}

function removeTransaction(id){
  return DB.getSingle(Queries.removeTransaction(id),()=>{});
}

function removeAllTransactions(){
  return DB.getSingle(Queries.removeAllTransactions(),()=>{});
}

function removeAllTransactionsForListingId(listingId){
  return DB.getSingle(Queries.removeListingTransactions(listingId),()=>{});
}

//TODO: flesh this out
//injected into listingFactory
function processCancelledListing(listing){
  return new Promise((resolve, reject)=>{
    Utility.log("processCancelledListing ran");
    /*
      give item back to lister
      give money back to highest bidder
      set listing expired <-- TODO: this should be done in listing factory
    */

    let itemId = listing.getItemId();
    let sellerId = listing.getSellerId();
    let amount = null;
    ItemFactory.transferItem(itemId, sellerId)
    .then(()=>{
      return getHighestTransactionForListing(listing.getId());
    })
    .then((trans)=>{
      if(trans!=null){
        amount = trans.getAmount();
        let highestBidderId = trans.getBidderId();
        return AccountFactory.getAccountFromId(highestBidderId);
      }
    })
    .then((acc)=>{
      if(acc!=null){
        return acc.addMoney(amount);
      }
    })
    .then(()=>{
      //remove all transactions associated with listing
      return removeAllTransactionsForListingId(listing.getId());
    })
    .then(()=>{
      setTimeout(()=>{ //TODO: test this, make sure it runs when expected
        ListingFactory.getListing(listing.getId())
        .then((l)=>{
          if(l != null){
            throw new Error("listing was cancelled but not removed from DB");
          } else {
            Utility.log("PASS: cancelled listing was removed from DB within 500ms ");
          }
        }).catch((e)=>{
          Utility.log("PASS: " + e);
        });
      },500);
    })
    .then(resolve)
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}
ListingFactory.setCancelledListingFn(processCancelledListing);

//this is injected into listingFactory
//this is also used by transactionFactory
//TODO: optimise this for processAllExpiredListings
function processExpiredListing(listing){
  return new Promise((resolve, reject)=>{
    Utility.assert(listing);
    Utility.log("processExpiredListing : " + listing.getId());
    let winningBid = null;
    let winningBidder = null;
    let itemId = listing.getItemId();
    let sellerId = listing.getSellerId();

    getHighestTransactionForListing(listing.getId())
    .then((trans)=>{
      if(trans!=null){
        winningBid = trans;
        winningBidder = winningBid.getBidderId();
        ItemFactory.transferItem(itemId, winningBidder)
        .then(()=>listing.setSold())
        .then(()=>{
          return AccountFactory.getAccountFromId(sellerId);
        })
        .then((acc)=>{
          return acc.addMoney(Number(winningBid.getAmount()));
        })
        .then(()=>{
          resolve();
        }).catch((e)=>{
          Utility.logError(e);
        });
      } else {
        //no bidder on listing
        ItemFactory.transferItem(itemId, sellerId)
        .then(resolve).catch((e)=>{
          Utility.logError(e);
        });
      }
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}
ListingFactory.setExpiredListingFn(processExpiredListing);


function bidOnListing(bidderId, listingId, bidAmount){
  return new Promise((resolve, reject)=>{
    //let sellerId = null;
    let minBid = null;
    let listing = null;
    let bidderAccount = null;
    let highestBidderTransaction = null;
    let fnId = String(Number(bidderId) + Number(listingId) + Number(bidAmount));
    let highestBidderId = null;
    ListingFactory.getListing(listingId)
    .then((list)=>{
      listing = list;
      if(listing.getType() != 'bid'){
        //TODO: understand why we have to reject AND throw...
        let errMsg = "Cant bid on "+listing.getType() + " : " + fnId;

        reject(new Error(errMsg));
        throw(new Error(errMsg));
      }
      if (bidderId == listing.getSellerId()){
        let errMsg = "Cant bid on own listing";

        reject(new Error(errMsg));
        throw(new Error(errMsg));
      }
      minBid = listing.getStartPrice();
      return Promise.all([AccountFactory.getAccountFromId(bidderId),
                          getHighestTransactionForListing(listingId)]);
    })
    .then((res)=>{
      bidderAccount = res[0];
      highestBidderTransaction = res[1];

      let maxBid = minBid-0.01;
      //let maxBidder = -1;
      if(highestBidderTransaction != null){
        maxBid = highestBidderTransaction.getAmount();
        highestBidderId = highestBidderTransaction.getBidderId();
        if(highestBidderId == bidderId){
          let errMsg = "cant outbid own bid, account id = " + bidderId;
          reject(new Error(errMsg));
          throw(new Error(errMsg));
        }
      }

      let bidderMoney = bidderAccount.getMoney();
      if (bidderMoney >= bidAmount //bidder has enough money to bid
         && bidderMoney > maxBid
         && bidAmount > maxBid){ //bidder has made a greater bid

          return bidderAccount.addMoney(-1*Number(bidAmount));//bidderAccount.changeMoney(Number(bidderMoney)-Number(bidAmount));
        } else {
          let errMsg = fnId + " insuffucient money : " + bidderAccount.getMoney()
            + " : expected more than : " + maxBid + " : by bidder : " + highestBidderId;
          reject(new Error(errMsg));
          throw(new Error(errMsg));
        }
    })
    .then(()=>{
      if(highestBidderId != null){
        return AccountFactory.getAccountFromId(highestBidderId);
      }
    })
    .then((highestBidderAcc)=>{ //return money to last bidder
      if(highestBidderId != null && highestBidderAcc != null){
        return highestBidderAcc.addMoney(Number(highestBidderTransaction.getAmount()));
      }
    })
    .then(()=>{
      return createTransaction(bidAmount, bidderId, listingId);
    })
    .then(trans=> resolve(trans))
    .catch((e)=>{
      Utility.logError(e);
    });
  });
  /*
    does bidder have enough money &&
    is bid amount higher than highest bid so far &&
    amount is higher than listingAmount
      true
        remove money from bidder
        create transaction
      false
  */

}

function buyoutListing(buyerId,listingId){
  /*
  does buyer have enough money
    yes
      transfer item to buyer
      add money to seller
      subtract money from buyer
    no
  */
  return new Promise((resolve, reject)=>{
    let sellerId = null;
    let listingAmount = null;
    let listing = null;
    ListingFactory.getListing(listingId)
    .then((lll)=>{
      listing = lll;
      if (listing.getType() != "buyout"){
        reject(new Error("Cant buyout on " +listing.getType()));
        throw new Error("Cant buyout on " +listing.getType());
      }
      if(buyerId == listing.getSellerId()){
        reject(new Error("Cant buyout own listing"));
        throw new Error("Cant buyout own listing");
      }
      sellerId = listing.getSellerId();
      listingAmount = listing.getStartPrice();
      return AccountFactory.getAccountFromId(buyerId);
    })
    .then((buyerAccount)=>{
      if (buyerAccount.getMoney() > listingAmount){
        return buyerAccount.addMoney(-1*Number(listingAmount));
      } else {
        let errMsg = "insuffucient money : " + buyerAccount.getMoney() + " : expected : " + listingAmount;
        reject(new Error(errMsg));
        throw new Error(errMsg);
      }
    })
    .then(()=>{
      return AccountFactory.getAccountFromId(sellerId);
    })
    .then(sellerAccount => sellerAccount.addMoney(Number(listingAmount)))
    .then(()=>ItemFactory.transferItem(listing.getItemId(), buyerId))
    .then(()=>listing.setSold())
    .then(()=>{
      return createTransaction(listingAmount, buyerId, listingId);
    })
    .then(trans=>resolve(trans))
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

module.exports = {
  createTransaction : createTransaction,
  getTransaction : getTransaction,
  getAllTransactions : getAllTransactions,
  removeTransaction : removeTransaction,
  removeAllTransactions : removeAllTransactions,
  buyoutListing : buyoutListing,
  bidOnListing : bidOnListing
};
