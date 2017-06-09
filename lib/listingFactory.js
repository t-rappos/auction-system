let Listing = require('./listing.js');
let DB = require('./serverDB.js');
let Queries = require('./listingFactoryQueries.js');
let ItemFactory = require('./itemFactory.js');

//set by transactionFactory
let _processExpiredListingFn = ()=>{}; //processExpired..(listing)
let _processCancelledListingFn = ()=>{}; //processCancelled..(listing)

//TODO: call this when a listing is cancelled or destroyed
_processCancelledListingFn(); //to pass lint

function setExpiredListingFn(fn){_processExpiredListingFn = fn;}
function setCancelledListingFn(fn){_processCancelledListingFn = fn;}

//TODO: think about refactoring this into listing objects
function queueListingExpiry(listing){
  let msTillExpiry = listing.getExpiryDate() - (new Date());
  if (msTillExpiry > 0){
    setTimeout(()=>{_processExpiredListingFn(listing);},msTillExpiry);
  } else {
    throw new Error('queueListingExpiry : listing has already expired');
  }
}

function processStoredListings(){
  return new Promise((resolve, reject)=>{
    console.log("processStoredListings : run on startup");
    getAllListings()
    .then((listings)=>{
      let actions = [];
      listings.map((l)=>{
        if(l.hasExpired()){
          console.log("will process expired listing = " + l.getId());
          actions.push(_processExpiredListingFn(l));
        } else {
          console.log("will queue listing to expire = " + l.getId());
          actions.push(queueListingExpiry(l));
        }
      });
      return Promise.all(actions);
    })
    .then(()=>{
      resolve();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
}

//on startup
processStoredListings();

function getListing(listingId){
  return new Promise((resolve, reject)=>{
    DB.query(Queries.getListing(listingId))
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          resolve(fillListing(result.rows[0]));
        } else {
          throw new Error("Couldn't create new listing!");
        }
      });
    });
}

function refreshListing(oldListing){
  return new Promise((resolve, reject)=>{
    getListing(oldListing.getId())
    .then((l)=>{
      oldListing.shallowCopy(l);
      resolve();
    }).catch(function(error){
      reject(error);
    });
  });
}

  //injected into listing
  function _setListingSold(listing){
    return new Promise((resolve,reject)=>{
      if (typeof listing != 'object'){reject( new Error('Expected listing to be object not :' + (typeof listing)));}
      let query = DB.query(Queries.setListingSold(listing.getId()));
      query.then(function(){
          refreshListing(listing).then(function(){
          resolve();
        });
      });
      query.catch(function(error){
        reject(error);
      });
    });
  }

  function fillListing(row){
    let listing = new Listing.Listing(row.id, row.item_id, row.type, row.starting_price,
      row.creation_date, row.expiry_date, row.seller_id, row.sold);
    listing._setSoldFn = _setListingSold.bind(null, listing);
    return listing;
  }

  //listTime is in ms
  //TODO: item has an owner... thus we shouldn't have to specify a seller id??
  function createListing(itemId, startPrice, listTime, type, sellerId){
    return new Promise((resolve, reject)=>{
      let listingId = null;
      DB.query(Queries.createListing(startPrice, listTime, type, sellerId))
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          listingId = result.rows[0].id;
        }
        return DB.query(Queries.linkListingToItem(itemId, listingId));
      })
      .then(()=>{
        return ItemFactory.disownItem(itemId);
      })
      .then(()=>{
        return DB.query(Queries.getListing(listingId));
      })
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          let resultantListing = fillListing(result.rows[0]);
          //lets queue the listing
          queueListingExpiry(resultantListing);
          resolve(resultantListing);
        } else {
          throw new Error("Couldn't create new listing!");
        }
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
    });
  }

  function getAllListings(){
    return DB.getMany(Queries.getAllListings(), fillListing);
  }

  function getAllExpiredListings(){
    return DB.getMany(Queries.getAllExpiredListings(), fillListing);
  }

  function getAccountListings(accountId){
    return DB.getMany(Queries.getAccountListings(accountId), fillListing);
  }

  //TODO: give item back to lister
  //maybe use expireListing instead... this would give the item back to lister
  //but could give it to a potential bidder instead...
  function cancelListing(itemId, listingId){
    return new Promise((resolve, reject)=>{
      let q = Queries.cancelListing(itemId, listingId);
      DB.query(q[0]).
      then(()=>{
        return DB.query(q[1]);
      })
      .then(()=>{
        resolve();
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
    });
  }

//TODO: make sure each listing is processed as cancelled, or removed from queue...
  function cancelAllListings(){
    return new Promise((resolve, reject)=>{
      let q = Queries.cancelAllListings();
      DB.query(q[0])
      .then(()=>{
        return DB.query(q[1]);
      })
      .then(()=>{
        resolve();
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
    });
  }

  function cancelAccountListings(accountId){
    return new Promise((resolve, reject)=>{
      let q = Queries.cancelAccountListings(accountId);
      DB.query(q[0])
      .then(()=>{
        return DB.query(q[1]);
      })
      .then(()=>{
        resolve();
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
    });
  }

module.exports = {
  getAllExpiredListings : getAllExpiredListings,
  getListing : getListing,
  createListing : createListing,
  getAllListings : getAllListings,
  getAccountListings : getAccountListings,
  cancelListing : cancelListing,
  cancelAllListings : cancelAllListings,
  cancelAccountListings : cancelAccountListings,
  setExpiredListingFn : setExpiredListingFn,
  setCancelledListingFn : setCancelledListingFn
};
