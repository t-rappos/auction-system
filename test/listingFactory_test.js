let expect = require('expect');
let ListingFactory = require('../lib/listingFactory.js');
let AccountFactory = require('../lib/accountFactory.js');
let ItemFactory = require('../lib/itemFactory.js');
let Utility = require('../lib/utility.js');
let UtilData = require('../lib/utilData.js');

let testItemId = null;
let testItemId2 = null;
let testAccountId = null;
let testListingId = null;
let testListingId2 = null;

describe('listing factory',function(){

  it("should exist",function(done){
    expect(ListingFactory).toExist();
    ListingFactory.cancelAllListings()
    .then(()=>{
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to do start up',function(done){
    AccountFactory.createAccount('lftom', 'lfpassword', 'lftom@gmail.com')
    .then((account)=>{
      testAccountId = account.getId();
      return ItemFactory.createItem('lfTestItemName', 'itemDesc', 'www.itemUrl.com', testAccountId);
    })
    .then((item)=>{
      testItemId = item.getId();
    })
    .then(()=>{
      return ItemFactory.createItem('lfTestItemName2', 'itemDesc2', 'www.itemUrl.com2', testAccountId);
    })
    .then((item)=>{
      testItemId2 = item.getId();
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
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
      Utility.logError(e);
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
      Utility.logError(e);
    });
  });

  it("should be able to get listings",function(done){
    ListingFactory.getAllListings()
    .then((listings)=>{
      expect(listings.length).toBe(2);
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
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
      Utility.logError(e);
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
      Utility.logError(e);
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
      Utility.logError(e);
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
      Utility.logError(e);
    });
  });

  let testListing = null;
  it("should expire", function(done){
    ListingFactory.createListing(testItemId, 100, 1500/*ms*/, 'bid', testAccountId)
    .then((l)=>{
      testListing = l;
      expect(testListing.hasExpired()).toBe(false, "should start not expired");
      return Utility.delay(500);
    }).then(()=>{
      expect(testListing.hasExpired()).toBe(false, "shouldnt expire early");
      return Utility.delay(1000);
    })
    .then(()=>{
      expect(testListing.hasExpired()).toBe(true, "should expire after date");
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

//TODO: rethink selling an expired listing
// what about startup expired listings, that need processing -> to be set to sold
  it("should not be able to be sell an expired listing", function(done){
    testListing.setSold()
    .then(()=>{
      done();
    })
    .catch((e)=>{
      expect(testListing.hasExpired()).toBe(true);
      done();
      Utility.logError(e);
    });
  });


  it("should be able to get listing", function(done){
    ListingFactory.getListing(testListing.getId())
    .then((listing)=>{
      expect(listing).toExist().toNotBe(null);
      expect(listing.getId()).toBe(testListing.getId());
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
  testListing=null;

  it("should be able to be set as sold", function(done){
    let tlisting;

    ListingFactory.cancelAllListings()
    .then(()=>{
      return ListingFactory.getAllListings();
    })
    .then((listings)=>{
      expect(listings.length).toBe(0, "listings should have been removed");
      return ListingFactory.createListing(testItemId, 100, 2000, 'bid', testAccountId);
    })
    .then((listing)=>{
      expect(listing.isSold()).toBe(false, 'shouldnt be sold initially');
      tlisting = listing;
      return listing.setSold();
    })
    .then(()=>{
      expect(tlisting.isSold()).toBe(true, 'should have been sold');
      return ListingFactory.cancelAllListings();
    })
    .then(()=>{
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to do shutdown",function(done){
    UtilData.clearAllData()
    .then(done)
    .catch((e)=>{
      Utility.logError(e);
    });
  });
});
