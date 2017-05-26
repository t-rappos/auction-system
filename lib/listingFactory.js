let Listing = require('./listing.js');
let DB = require('./serverDB.js');
let Queries = require('./listingFactoryQueries.js');

  function fillListing(row){
    let listing = new Listing.Listing(row.id, row.item_id, row.type, row.starting_price,
      row.creation_date, row.expiry_date, row.seller_id, row.sold);
    return listing;
  }

  function createListing(itemId, startPrice, listTime, type, sellerId){
    return new Promise((resolve, reject)=>{
      let listingId = null;
      DB.query(Queries.createListing(startPrice, listTime, type, sellerId))
      .then((result)=>{
        if(result && result.rows && result.rows.length > 0){
          listingId = result.rows[0].id;
        }
        console.log("listing id : " + listingId);
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
  createListing : createListing,
  getAllListings : getAllListings,
  getAccountListings : getAccountListings,
  cancelListing : cancelListing,
  cancelAllListings : cancelAllListings,
  cancelAccountListings : cancelAccountListings
};
