let DB = require('./serverDB.js');
//let Account =require('./account.js');
let Queries = require('./transactionFactoryQueries.js');
let Transaction = require('./transaction.js');
let AccountFactory = require('./accountFactory.js');
let ListingFactory = require('./listingFactory.js');
let ItemFactory = require('./itemFactory.js');

//let ItemQueries = require('./itemFactoryQueries.js');
//let TagQueries = require('./tagFactoryQueries.js');
//let ListingQueries = require('./listingFactoryQueries.js');

function fillTransaction(row){
  console.log("filled " + row.id);
  return new Transaction.Transaction(row.id, Number(row.amount), row.creation_date,
    row.bidder_id, row.listing_id);
}

function createTransaction(amount, accountId, listingId){
  return new Promise((resolve, reject)=>{
      console.log("create transaction("+amount+", " + accountId + ", "+listingId+")");
      DB.query(Queries.createTransaction(amount, accountId, listingId))
      .then((res)=>{
        if(res && res.rows && res.rows.length > 0){
          resolve(getTransaction(res.rows[0].id));
        } else {
          console.log("couldn't create transaction");
        }
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
  });
}

function getTransaction(id){
  return new Promise((resolve, reject)=>{
    console.log("get transaction for id ( " + id);
    DB.query(Queries.getTransaction(id))
    .then((res)=>{
      if(res && res.rows && res.rows.length > 0){
        console.log("get transaction found res for : " + res.rows[0].id);
        resolve(fillTransaction(res.rows[0]));
      }else{
        console.log("couldn't get transaction");
      }
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
}

function getAllTransactions(){
  return new Promise((resolve, reject)=>{
    console.log("getAllTransactions()");
    let transactions = [];
    DB.query(Queries.getAllTransactions())
    .then((res)=>{
      if(res && res.rows && res.rows.length > 0){
        res.rows.map((row)=>{
          transactions.push(fillTransaction(row));
        });
      }
      resolve(transactions);
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
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
  buyoutListing : buyoutListing
};
