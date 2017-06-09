let DB = require('./serverDB.js');
//let Account =require('./account.js');
let Queries = require('./transactionFactoryQueries.js');
let Transaction = require('./transaction.js');
let AccountFactory = require('./accountFactory.js');
let ListingFactory = require('./listingFactory.js');
let ItemFactory = require('./itemFactory.js');
let Utility = require('./utility.js');

//let ItemQueries = require('./itemFactoryQueries.js');
//let TagQueries = require('./tagFactoryQueries.js');
//let ListingQueries = require('./listingFactoryQueries.js');

function fillTransaction(row){
  Utility.assert(row, 'fillTransaction');
  console.log("filled " + row.id);
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
  let query = "SELECT * FROM bid WHERE listing_id = '"+listingId+"' ORDER BY amount DESC;";
  return DB.getSingle(query, fillTransaction);
}

function getAllTransactions(){
  return DB.getMany(Queries.getAllTransactions(), fillTransaction);
}

function removeTransaction(id){
  return new Promise((resolve, reject)=>{
    console.log("removeTransaction("+id+")");
     DB.query(Queries.removeTransaction(id))
     .then(()=>{
       console.log("removeTransaction("+id+") successful");
       resolve();
     })
     .catch((e)=>{
       console.log("removeTransaction("+id+") failed");
       console.log(e);
       throw(e);
     });
  });
}

function removeAllTransactions(){
  return new Promise((resolve, reject)=>{
      console.log("removeAllTransactions()");
     DB.query(Queries.removeAllTransactions())
     .then(()=>{
       console.log("removeAllTransactions() successful");
       resolve();
     })
     .catch((e)=>{
       console.log("removeAllTransactions() failed");
       console.log(e);
       throw(e);
     });
  });
}

//TODO: flesh this out
//injected into listingFactory
function processCancelledListing(listing){

}
ListingFactory.setCancelledListingFn(processCancelledListing);

//this is injected into listingFactory
//this is also used by transactionFactory
//TODO: optimise this for processAllExpiredListings
function processExpiredListing(listing){
  return new Promise((resolve, reject)=>{
    Utility.assert(listing);
    console.log("processExpiredListing : " + listing.getId());
    let winningBid = null;
    let winningBidder = null;
    let itemId = listing.getItemId();
    let sellerId = listing.getSellerId();

    getHighestTransactionForListing(listing.getId())
    .then((trans)=>{
      console.log("a");
      if(trans!=null){
        winningBid = trans;
        winningBidder = winningBid.getBidderId();
        console.log("b");
        ItemFactory.transferItem(itemId, winningBidder)
        .then(()=>{
          console.log("c");
          return listing.setSold();
        })
        .then(()=>{
          console.log("d");
          return AccountFactory.getAccountFromId(sellerId);
        })
        .then((acc)=>{
          console.log("giving money to seller, " + acc.getMoney() + " + " +  winningBid.getAmount());
          return acc.changeMoney(acc.getMoney() + winningBid.getAmount());
        })
        .then(()=>{
          console.log("e");
          resolve();
        }).catch((e)=>{
          console.log(e);
          throw(e);
        });
      } else {
        //no bidder on listing
        console.log("f");
        ItemFactory.transferItem(itemId, sellerId)
        .then(()=>{
          console.log("g");
          resolve();
        }).catch((e)=>{
          console.log(e);
          throw(e);
        });
      }
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
}
ListingFactory.setExpiredListingFn(processExpiredListing);



//getHighestTransactionForListing
function bidOnListing(bidderId, listingId, bidAmount){
  return new Promise((resolve, reject)=>{
    //let sellerId = null;
    let minBid = null;
    let listing = null;
    let bidderAccount = null;
    let highestBidderTransaction = null;
    ListingFactory.getListing(listingId)
    .then((list)=>{
      listing = list;
      //sellerId = listing.getSellerId();
      minBid = listing.getStartPrice();
      return Promise.all([AccountFactory.getAccountFromId(bidderId),
                          getHighestTransactionForListing(listingId)]);
    })
    .then((res)=>{
      bidderAccount = res[0];
      highestBidderTransaction = res[1];

      let maxBid = minBid;
      let maxBidder = -1;
      if(highestBidderTransaction != null){
        maxBid = highestBidderTransaction.getAmount();
        maxBidder = highestBidderTransaction.getBidderId();
      }

      let bidderMoney = bidderAccount.getMoney();
      if (bidderMoney >= bidAmount //bidder has enough money to bid
         && bidderMoney > maxBid){ //bidder has made a greater bid
          return bidderAccount.changeMoney(Number(bidderMoney)-Number(bidAmount));
        } else {
          throw new Error("insuffucient money : " + bidderAccount.getMoney()
          + " : expected more than : " + maxBid
          + " : by bidder : " + maxBidder);
        }
    })
    .then(()=>{
      //return money to highest bidder // outbid event emmit?
    })
    .then(()=>{
      return createTransaction(bidAmount, bidderId, listingId);
    })
    .then((trans)=>{
      resolve(trans);
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
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
      sellerId = listing.getSellerId();
      listingAmount = listing.getStartPrice();
      return AccountFactory.getAccountFromId(buyerId);
    })
    .then((buyerAccount)=>{
      if (buyerAccount.getMoney() > listingAmount){
        return buyerAccount.changeMoney(Number(buyerAccount.getMoney())-Number(listingAmount));
      } else {
        throw new Error("insuffucient money : " + buyerAccount.getMoney() + " : expected : " + listingAmount);
      }
    })
    .then(()=>{
      return AccountFactory.getAccountFromId(sellerId);
    })
    .then((sellerAccount)=>{
      return sellerAccount.changeMoney(Number(sellerAccount.getMoney()) + Number(listingAmount));
    })
    .then(()=>{
      return ItemFactory.transferItem(listing.getItemId(), buyerId);
    })
    .then(()=>{
      return listing.setSold();
    })
    .then(()=>{
      return createTransaction(listingAmount, buyerId, listingId);
    })
    .then((trans)=>{
      resolve(trans);
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
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
