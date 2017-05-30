let Listing = require('./listing.js');
let DB = require('./serverDB.js');
let Queries = require('./listingFactoryQueries.js');

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
    //return new Promise((resolve, reject)=>{
    //  if (typeof listing != 'object'){reject( new Error('Expected listing to be object not :' + (typeof listing)));}
    //  resolve(DB.query(Queries.setListingSold(listing.getId()))
    //        .then(refreshListing(listing)).then(()=>{}));
    //});
    return new Promise((resolve,reject)=>{
      console.log("_setSold callback called");
      if (typeof listing != 'object'){reject( new Error('Expected listing to be object not :' + (typeof listing)));}
      let query = DB.query(Queries.setListingSold(listing.getId()));
      query.then(function(){
          refreshListing(listing).then(function(){
            console.log("_setSold callback called and resolved");
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
        return DB.query(Queries.getListing(listingId));
      })
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          resolve(fillListing(result.rows[0]));
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
    return new Promise((resolve, reject)=>{
      let listings = [];
      DB.query(Queries.getAllListings())
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          result.rows.map((row)=>{
            listings.push(fillListing(row));
          });
        }
        resolve(listings);
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
    });
  }

  function getAccountListings(accountId){
    return new Promise((resolve, reject)=>{
      let listings = [];
      DB.query(Queries.getAccountListings(accountId))
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          result.rows.map((row)=>{
            listings.push(fillListing(row));
          });
        }
        resolve(listings);
      })
      .catch((e)=>{
        console.log(e);
        throw(e);
      });
    });
  }

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
  getListing : getListing,
  createListing : createListing,
  getAllListings : getAllListings,
  getAccountListings : getAccountListings,
  cancelListing : cancelListing,
  cancelAllListings : cancelAllListings,
  cancelAccountListings : cancelAccountListings
};
