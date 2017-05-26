let expect = require('expect');
let ListingFactory = require('../lib/listingFactory.js');
let AccountFactory = require('../lib/accountFactory.js');
let ItemFactory = require('../lib/itemFactory.js');

let testItemId = null;
let testItemId2 = null;
let testAccountId = null;
let testListingId = null;
let testListingId2 = null;

describe('listing factory',function(){

  it("should exist",function(done){
    expect(ListingFactory).toExist();
    ListingFactory.cancelAllListings().then(()=>{
      done();
    });
  });

  it('should be able to do start up',function(done){

    AccountFactory.createAccount('lftom', 'lfpassword', 'lftom@gmail.com')
    .then((account)=>{

      testAccountId = account.getId();
      console.log("Test account id = "+testAccountId);
      return ItemFactory.createItem('lfTestItemName', 'itemDesc', 'www.itemUrl.com', testAccountId);
    })
    .then((item)=>{

      testItemId = item.getId();
      console.log("Test item id = "+testItemId);
    })
    .then(()=>{

      return ItemFactory.createItem('lfTestItemName2', 'itemDesc2', 'www.itemUrl.com2', testAccountId);
    })
    .then((item)=>{

      testItemId2 = item.getId();
      done();
    })
    .catch((e)=>{

      console.log(e);
      throw(e);
    });
  });

  it("should be able to add listing bid",function(done){
    //(itemId, startPrice, listTime, type, sellerId){
    ListingFactory.createListing(testItemId, 100, 3600*24, 'bid', testAccountId)
    .then((listing)=>{
      expect(listing).toNotBe(null).toNotBe(undefined);
      expect(listing.getItemId()).toBe(testItemId);
      expect(listing.getType()).toBe('bid');
      expect(listing.getStartPrice()).toBe('100');
      expect(listing.getCreationDate()).toNotBe(null).toNotBe(undefined);
      expect(listing.getExpiryDate()).toNotBe(null).toNotBe(undefined);
      expect(listing.getSellerId()).toBe(testAccountId);
      expect(listing.isSold()).toBe(false);
      expect(listing.getId()).toNotBe(null);
      testListingId = listing.getId();
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });


  it("should be able to add listing buyout",function(done){
    ListingFactory.createListing(testItemId2, 100, 3600*24, 'buyout', testAccountId)
    .then((listing)=>{
      expect(listing).toNotBe(null).toNotBe(undefined);
      expect(listing.getItemId()).toBe(testItemId2);
      expect(listing.getType()).toBe('buyout');
      expect(listing.getStartPrice()).toBe('100');
      expect(listing.getCreationDate()).toNotBe(null).toNotBe(undefined);
      expect(listing.getExpiryDate()).toNotBe(null).toNotBe(undefined);
      expect(listing.getSellerId()).toBe(testAccountId);
      expect(listing.isSold()).toBe(false);
      expect(listing.getId()).toNotBe(null);
      testListingId2 = listing.getId();
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should be able to get listings",function(done){
    ListingFactory.getAllListings()
    .then((listings)=>{
      expect(listings.length).toBe(2);
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should be able to get account listings",function(done){
    ListingFactory.getAccountListings(testAccountId)
    .then((listings)=>{
      expect(listings.length).toBe(2);
      return ListingFactory.getAccountListings(-1);
    })
    .then((listings)=>{
      expect(listings.length).toBe(0);
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should be able to cancel listings",function(done){
    ListingFactory.getAccountListings(testAccountId)
    .then((listings)=>{
      expect(listings.length).toBe(2);
      return ListingFactory.cancelListing(testItemId, testListingId);
    })
    .then(()=>{
      return ListingFactory.getAccountListings(testAccountId);
    })
    .then((listings)=>{
      expect(listings.length).toBe(1);
      expect(listings[0].getId()).toBe(testListingId2);
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should be able to cancel all listings",function(done){
    ListingFactory.cancelAllListings()
    .then(()=>{
      return ListingFactory.getAllListings();
    })
    .then((listings)=>{
      expect(listings.length).toBe(0);
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should be able to cancel all user listings",function(done){
    ListingFactory.createListing(testItemId, 100, 3600*24, 'bid', testAccountId)
    .then(()=>{
      return ListingFactory.getAccountListings(testAccountId);
    })
    .then((listings)=>{
      expect(listings.length).toBe(1);
      return ListingFactory.cancelAccountListings(testAccountId);
    })
    .then(()=>{
      return ListingFactory.getAccountListings(testAccountId);
    })
    .then((listings)=>{
      expect(listings.length).toBe(0);
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should be able to do shutdown",function(done){
     ItemFactory.removeAllItems()
     .then(()=>{
       AccountFactory.destroyAllAccounts();
     })
     .then(()=>{
       done();
     })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });
});
