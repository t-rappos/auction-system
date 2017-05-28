let expect = require('expect');
let TransactionFactory = require('../lib/TransactionFactory.js');
let ListingFactory = require('../lib/listingFactory.js');
let AccountFactory = require('../lib/accountFactory.js');
let ItemFactory = require('../lib/itemFactory.js');

let testItemId = null;
let testItemId2 = null;
let testAccountId = null;
let testAccountId2 = null;
let testListingId = null;
let testListingId2 = null;
let testBidId = null;
let testBuyoutId = null;

describe('TransactionFactory',function(){
  it('should be able to do intial cleanup', function(done){
    console.log("TODO: Implement account factory construction with money");
    AccountFactory.createAccount('tftom2', 'password', 'tftom@gmail.com2', '1000')
    .then((account)=>{
      testAccountId2 = account.getId();
      return AccountFactory.createAccount('tftom', 'password', 'tftom@gmail.com', '1000');
    })
    .then((account)=>{
      testAccountId = account.getId();
      return ItemFactory.createItem('tfTestItemName', 'itemDesc', 'www.itemUrl.com', testAccountId);
    })
    .then((item)=>{
      testItemId = item.getId();
      return ListingFactory.createListing(testItemId, 100, 3600*24, 'bid', testAccountId);
    })
    .then((listing)=>{
      testListingId = listing.getId();
      done();
    })
    .then(()=>{
      return ItemFactory.createItem('tfTestItemName2', 'itemDesc2', 'www.itemUrl.com2', testAccountId);
    })
    .then((item)=>{
      testItemId2 = item.getId();
      return ListingFactory.createListing(testItemId2, 100, 3600*24, 'bid', testAccountId);
    })
    .then((listing)=>{
      testListingId2 = listing.getId();
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it("should exist",function(done){
    expect(TransactionFactory).toExist();
    done();
  });

  it("should be able to create bid for listing",function(done){
    let amount = '100';
    ListingFactory.createBid(amount, testAccountId, testListingId)
    .then((bid)=>{
      testBidId = bid.getId();
      expect(bid.getId()).toNotBe(null);
      expect(bid.getPriorBidId()).toBe(null);
      expect(bid.getAmount()).toBe(amount);
      expect(bid.getCreationDate()).toNotBe(null);
      expect(bid.getBidderId()).toBe(testAccountId);
      expect(bid.getListingId()).toBe(testListingId);
      expect(bid.isPending()).toBe(true);
      expect(bid.isSuccessful()).toBe(false);
      done();
    });
  });

  it("should be able to create buyout for listing",function(done){
    let amount = '100';
    ListingFactory.createBuyout(amount, testAccountId, testListingId2)
    .then((bid)=>{
      testBidId = bid.getId();
      expect(bid.getId()).toNotBe(null);
      expect(bid.getPriorBidId()).toBe(null);
      expect(bid.getAmount()).toBe(amount);
      expect(bid.getCreationDate()).toNotBe(null);
      expect(bid.getBidderId()).toBe(testAccountId);
      expect(bid.getListingId()).toBe(testListingId2);
      expect(bid.isPending()).toBe(false);
      expect(bid.isSuccessful()).toBe(true);
      done();
    });
  });

  it("should be able to get all transactions", function(done){
    ListingFactory.getAllTransactions().then((transactions)=>{
      expect(transactions.length).toBe(2);
      done();
    });
  });

  it("should be able to remove bid / buyout",function(done){
    ListingFactory.removeTransaction(testBidId)
    .then(ListingFactory.removeTransaction(testBuyoutId))
    .then(ListingFactory.getAllTransactions())
    .then((transactions)=>{
      expect(transactions.length).toBe(0);
      done();
    });
  });

  it("should be able to remove all bids / buyout",function(done){
    let amount = '100';
    ListingFactory.createBid(amount, testAccountId, testListingId)
    .then(ListingFactory.createBuyout(amount, testAccountId, testListingId2))
    .then(ListingFactory.getAllTransactions())
    .then((transactions)=>{
      expect(transactions.length).toBe(2);
    })
    .then(ListingFactory.removeAllTransactions())
    .then(ListingFactory.getAllTransactions())
    .then((transactions)=>{
      expect(transactions.length).toBe(0);
      done();
    });
  });

//TODO: should this be in transaction API?
  describe("should be able to bid on listing",function(done){
    it("should be able to bid first and cost money",function(done){done();});
    it("should get item after listing expires",function(done){done();});
    it("shouldnt get item after listing expires",function(done){done();});
    it("shouldnt be able to bid with not enough money",function(done){done();});
    it("shouldnt be able to bid on buyout listing",function(done){done();});
    it("should get money back after failed bid listing expires",function(done){done();});
    it("shouldnt be able to bid on own listing",function(done){done();});
    it("shouldnt be able to bid over own bid",function(done){done();});
    it('should get money back if outbid', function(done){done();});
    it("should be able to outbid the outbidder", function(done){done();});
    it("should be able to undo expired winning bid",function(done){done();});
    it("should be able to undo pending bid",function(done){done();});
  });

  describe("should be able to buyout listing",function(done){
    it("should get item and cost money",function(done){done();});
    it("shouldnt be able to buyout listing with not enough money",function(done){done();});
    it("shouldnt be able to buyout bid listing",function(done){done();});
    it("shouldnt be able to buyout own listing",function(done){done();});
    it("should be able to undo buyout", function(done){done();});
  });

  it('should be able to do shut cleanup', function(done){
    TransactionFactory.removeAllTransactions()
    .then(ListingFactory.cancelAllListings())
    .then(ItemFactory.removeAllItems())
    .then(AccountFactory.destroyAllAccounts())
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
    done();
  });
});
