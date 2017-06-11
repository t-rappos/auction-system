let expect = require('expect');
let TransactionFactory = require('../lib/transactionFactory.js');
let ListingFactory = require('../lib/listingFactory.js');
let AccountFactory = require('../lib/accountFactory.js');
let ItemFactory = require('../lib/itemFactory.js');
let Utility = require('../lib/utility.js');

let testItemId = null;
let testItemId2 = null;
let testAccountId = null;
let testAccountId2 = null;
let testListingId = null;
let testListingId2 = null;
let testBidId = null;
let testBuyoutId = null;

function clearAll(){
  return new Promise((resolve, reject)=>{
    TransactionFactory.removeAllTransactions()
    .then(()=>{
      return ListingFactory.cancelAllListings();
    })
    .then(()=>{
      return ItemFactory.removeAllItems();
    })
    .then(()=>{
      return AccountFactory.destroyAllAccounts();
    })
    .then(()=>{
      resolve();
    });
  });
}

describe('TransactionFactory',function(){
  it('should be able to do intial cleanup', function(done){
    AccountFactory.createAccount('tftom2', 'password', 'tftom@gmail.com2', '1000')
    .then((account)=>{
      expect(account).toExist('account');
      testAccountId2 = account.getId();
      expect(testAccountId2).toBe(account.getId());
      return AccountFactory.createAccount('tftom', 'password', 'tftom@gmail.com', '1000');
    })
    .then((account)=>{
      expect(account).toExist('account2');
      testAccountId = account.getId();
      return ItemFactory.createItem('tfTestItemName', 'itemDesc', 'www.itemUrl.com', testAccountId);
    })
    .then((item)=>{
      expect(item).toExist('item');
      testItemId = item.getId();
      return ListingFactory.createListing(testItemId, 100, 3600*24, 'bid', testAccountId);
    })
    .then((listing)=>{
      expect(listing).toExist('listing');
      testListingId = listing.getId();
    })
    .then(()=>{
      return ItemFactory.createItem('tfTestItemName2', 'itemDesc2', 'www.itemUrl.com2', testAccountId);
    })
    .then((item)=>{
      expect(item).toExist('item2');
      testItemId2 = item.getId();
      return ListingFactory.createListing(testItemId2, 100, 3600*24, 'bid', testAccountId);
    })
    .then((listing)=>{
      expect(listing).toExist('listing');
      testListingId2 = listing.getId();
      done();

    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should exist",function(done){
    expect(TransactionFactory).toExist();
    done();
  });

  it("should be able to create transaction for listing",function(done){
    let amount = 100;
    TransactionFactory.createTransaction(amount, testAccountId, testListingId)
    .then((bid)=>{
      testBidId = bid.getId();
      expect(bid.getId()).toNotBe(null, "id failed");
      expect(bid.getAmount()).toBe(amount, "amount failed");
      expect(bid.getCreationDate()).toNotBe(null, 'creation_date failed');
      expect(bid.getBidderId()).toBe(testAccountId, 'bidder_id failed');
      expect(bid.getListingId()).toBe(testListingId, 'listing id failed');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to create buyout for listing",function(done){
    let amount = 100;
    TransactionFactory.createTransaction(amount, testAccountId, testListingId2)
    .then((bid)=>{
      testBuyoutId = bid.getId();
      expect(bid.getId()).toNotBe(null, "id failed");
      expect(bid.getAmount()).toBe(amount, "amount failed");
      expect(bid.getCreationDate()).toNotBe(null, 'creation_date failed');
      expect(bid.getBidderId()).toBe(testAccountId, 'bidder_id failed');
      expect(bid.getListingId()).toBe(testListingId2, 'listing id failed');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to get all transactions", function(done){
    TransactionFactory.getAllTransactions()
    .then((transactions)=>{
      expect(transactions.length).toBe(2, 'should have 2 transactions');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to remove bid / buyout",function(done){
    TransactionFactory.removeTransaction(testBidId)
    .then(()=>{return TransactionFactory.removeTransaction(testBuyoutId);})
    .then(()=>{return TransactionFactory.getAllTransactions();})
    .then((transactions)=>{
      expect(transactions.length).toBe(0, 'should have 0 transactions');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to remove all bids / buyout",function(done){
    let amount = '100';
    TransactionFactory.createTransaction(amount, testAccountId, testListingId)
    .then(()=>{return TransactionFactory.createTransaction(amount, testAccountId, testListingId2);})
    .then(()=>{return TransactionFactory.getAllTransactions();})
    .then((transactions)=>{
      expect(transactions.length).toBe(2, 'should have 2 transactions');
    })
    .then(()=>{return TransactionFactory.removeAllTransactions();})
    .then(()=>{return TransactionFactory.getAllTransactions();})
    .then((transactions)=>{
      expect(transactions.length).toBe(0, 'should have 0 transactions');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

//TODO: should this be in transaction API?
//TODO: can we refactor these tests?
  describe("should be able to bid on listing",function(done){

    //TODO: remove this, its just a template to assert errors in
    it("should throw error test",function(done){
      var promise = new Promise((resolve, reject)=>{
        throw new Error("error");
      });
      promise.then(()=>{
        expect("shouldn't have succeeded").toBe('should have failed');
      });
      promise.catch((e)=>{
        expect(e+"" /*<-- this is important, have to convert to string!*/).toMatch(/error/);
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });

    it("should be able to bid first and cost money",function(done){
      let acc1 = null;   let acc2 = null;
      let item = null;   let listing = null;
      let trans = null;
      let acc1Items = null;  let acc2Items = null;
      let acc1Money = null;  let acc2Money = null;
      Promise.all([AccountFactory.createAccount('testA2', 'password', 'tftom@gmdsfgail.com22', '1000'),
              AccountFactory.createAccount('testB2', 'password', 'tftom@gmsdfgail.com2', '1000')])
      .then((accounts)=>{
        acc1 = accounts[0];  acc2 = accounts[1];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 1001/*ms*/, 'bid', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return TransactionFactory.bidOnListing(acc2.getId(), listing.getId(), 100);
      })
      .then((t)=>{
        trans = t;
        //TODO: make it so we don't have to refresh all this crap...
        return Promise.all([ItemFactory.getAccountItems(acc1.getId()),
                            ItemFactory.getAccountItems(acc2.getId()),
                            ListingFactory.getListing(listing.getId())]);
      })
      .then((results)=>{
        acc1Items = results[0]; acc2Items = results[1];
        listing = results[2];
        expect(acc1Items.length).toBe(0, 'seller should have no items');
        expect(acc2Items.length).toBe(0, 'buyer shouldnt have item');
        expect(acc1.getMoney()).toBe(1000, 'seller should have 1000 money not : ' + acc1Money);
        expect(acc2.getMoney()).toBe(900, 'buyer should have 900, not : '+acc2Money);
        expect(listing.isSold()).toBe(false, 'listing should not be sold');
        expect(trans.getAmount()).toBe(100, 'transaction amount should be correct, not :' + trans.getAmount());
        expect(trans.getBidderId()).toBe(acc2.getId(), 'trans bidder id should be correct, not : '+ trans.getBidderId());
        return Utility.delay(1001);
      })
      .then(()=>{
        return Promise.all([ItemFactory.getAccountItems(acc1.getId()),
                            ItemFactory.getAccountItems(acc2.getId()),
                            ListingFactory.getListing(listing.getId())]);
      })
      .then((results)=>{
        acc1Items = results[0];    acc2Items = results[1];
        listing = results[2];
        expect(acc1Items.length).toBe(0, 'seller should have no items');
        expect(acc2Items.length).toBe(1, 'buyer should have item');
        expect(acc2Items[0].getId()).toBe(item.getId(),'item id should be correct');
        expect(acc1.getMoney()).toBe(1100, 'seller should have 1100 money not : ' + acc1Money);
        expect(acc2.getMoney()).toBe(900, 'buyer should have 900, not : '+acc2Money);
        expect(listing.isSold()).toBe(true, 'listing should have been sold');
        expect(trans.getAmount()).toBe(100, 'transaction amount should be correct, not :' + trans.getAmount());
        expect(trans.getBidderId()).toBe(acc2.getId(), 'trans bidder id should be correct, not : '+ trans.getBidderId());
      })
      .then(()=>{
        return clearAll();
      })
      .then(()=>{
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });

    it("should return item to lister after unsuccessful listing expires",function(done){
      let acc1 = null;
      let item = null;   let listing = null;
      let acc1Items = null;
      let acc1Money = null;

      Promise.all([AccountFactory.createAccount('testA2', 'password', 'tftom@gmdsfgail.com22', '1000'),
              AccountFactory.createAccount('testB2', 'password', 'tftom@gmsdfgail.com2', '1000')])
      .then((accounts)=>{
        acc1 = accounts[0];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 1001/*ms*/, 'bid', acc1.getId());
      })
      .then((lis)=>{
        listing = lis;
        return Promise.all([ItemFactory.getAccountItems(acc1.getId()),
                            ListingFactory.getListing(listing.getId())]);
      })
      .then((results)=>{
        acc1Items = results[0];
        listing = results[1];
        expect(acc1Items.length).toBe(0, 'seller should have no items');
        expect(acc1.getMoney()).toBe(1000, 'seller should have 1000 money not : ' + acc1Money);
        expect(listing.isSold()).toBe(false, 'listing should not be sold');
        return Utility.delay(1001);
      })
      .then(()=>{
        return Promise.all([ItemFactory.getAccountItems(acc1.getId()),
                            ListingFactory.getListing(listing.getId())]);
      })
      .then((results)=>{
        acc1Items = results[0];
        listing = results[1];
        expect(acc1Items.length).toBe(1, 'seller should have item returned');
        expect(acc1Items[0].getId()).toBe(item.getId(),'item id should be correct');
        expect(acc1.getMoney()).toBe(1000, 'seller should have 1000 money not : ' + acc1Money);
        expect(listing.isSold()).toBe(false, 'listing should not have been sold');
      })
      .then(()=>{
        return clearAll();
      })
      .then(()=>{
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });

    it("shouldnt be able to bid with not enough money",function(done){
      let acc1 = null;
      let acc2 = null;
      let item = null;
      let goodPath = false;
      Promise.all([AccountFactory.createAccount('testA2', 'password', 'tftom@gmdsfgail.com22', '1000'),
              AccountFactory.createAccount('testB2', 'password', 'tftom@gmsdfgail.com2', '0')])
      .then((accounts)=>{
        acc1 = accounts[0];  acc2 = accounts[1];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 1001/*ms*/, 'bid', acc1.getId());
      })
      .then((l)=>{
        return TransactionFactory.bidOnListing(acc2.getId(), l.getId(), 100);
      })
      .catch((e)=>{
        Utility.log(e);
        expect(e+"").toMatch(/money/);
        goodPath = true;

      })
      .then(()=>{
        return clearAll();
      })
      .then(()=>{
        done();
        expect(goodPath).toBe(true);
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });

    it("shouldnt be able to bid on buyout listing",function(done){
      let acc1 = null;
      let acc2 = null;
      let item = null;
      let listing = null;
      let goodPath = false;

      Promise.all([AccountFactory.createAccount('testA2', 'password', 'tftom@gmdsfgail.com22', '1000'),
              AccountFactory.createAccount('testB2', 'password', 'tftom@gmsdfgail.com2', '1000')])
      .then((accounts)=>{
        acc1 = accounts[0];  acc2 = accounts[1];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 1001/*ms*/, 'buyout', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return TransactionFactory.bidOnListing(acc2.getId(), listing.getId(), 100);
      })
      .then((t)=>{
        expect(t).toBe(null, "should return null transaction, since we cant bid on a buyout");
        Utility.logWarning("error: "+"bidOnListing should error instead of returning null, when bidding on a buyout");
      })
      .catch((e)=>{
        Utility.log(e);
        expect(e+"").toMatch(/Cant bid on buyout/);
        goodPath = true;
      })
      .then(()=>{
        return clearAll();
      })
      .then(()=>{
        done();
        expect(goodPath).toBe(true); //NOTE: this is to make sure that the
                                    //promise is processed until clearAll is fully done
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });
    it("should get failed bid attempt money after listing expires",function(done){

      /*
      [x] acc1 bids on acc1 listing
        /should fail/
      [x] acc2 bids on acc1 listing
        /should work/
      [x] acc3 bids on acc1 listing
        /low bid should fail/
      [x] acc3 bids on acc1 listing
        /same bid should fail/
      [x] acc3 bids on acc1 listing
        /high bid should work/
        /acc 2 should have its bid money back/
      [x] acc3 bids on acc1 listing
        /high bid should fail/
      [x] acc2 bids on acc1 listing
        /should work/
      */
      let catchCount = 0;
      let acc1 = null;
      let acc2 = null;
      let acc3 = null;
      let item = null;
      let listing = null;
      Promise.all([AccountFactory.createAccount('t1', 'password', 'tftom@gmdsfgail.com21', '1000'),
                   AccountFactory.createAccount('t2', 'password', 'tftom@gmdsfgail.com22', '1000'),
                   AccountFactory.createAccount('t3', 'password', 'tftom@gmsdfgail.com23', '1000')])
      .then((accs)=>{
        acc1 = accs[0];
        acc2 = accs[1];
        acc3 = accs[2];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 1001/*ms*/, 'bid', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return TransactionFactory.bidOnListing(acc1.getId(), listing.getId(), 100);
      })
      .catch((e)=>{
        catchCount++;
        expect(e+"").toMatch(/own/, 'expct: error message didnt match : cant bid on own listing, !=  ' + e);
        return TransactionFactory.bidOnListing(acc2.getId(), listing.getId(), 150);
      })
      .then((t)=>{
        expect(t).toNotBe(null);
        return TransactionFactory.bidOnListing(acc3.getId(), listing.getId(), 120);
      })
      .catch((e)=>{
        catchCount++;
        expect(e+"").toMatch(/money/, 'expct: error message didnt match : cant bid less than max bid, !=  ' + e);
        return TransactionFactory.bidOnListing(acc3.getId(), listing.getId(), 150);
      })
      .catch((e)=>{
        catchCount++;
        expect(e+"").toMatch(/money/, 'expct: error message didnt match : cant bid equal to max bid, !=  ' + e);
        return TransactionFactory.bidOnListing(acc3.getId(), listing.getId(), 170);
      })
      .then((t)=>{
        expect(t).toNotBe(null);
        let m = acc2.getMoney();
        expect(m).toBe(1000, 'expct: account 2 should have 1000 money back, not ' + m);
        return TransactionFactory.bidOnListing(acc3.getId(), listing.getId(), 190);
      })
      .catch((e)=>{
        catchCount++;
        expect(e+"").toMatch(/own/, 'expct: error message didnt match : cant over bid own max bid, !=  ' + e);
        return TransactionFactory.bidOnListing(acc2.getId(), listing.getId(), 200);
      })
      .then((t)=>{
        expect(t).toNotBe(null);
        let m1 = acc1.getMoney();
        let m2 = acc2.getMoney();
        expect(m1).toBe(1000, 'expct: account 3 should have 1000 money back, not ' + m1);
        expect(m2).toBe(800, 'expct: account 2 should have 800 money, not ' + m2);
      })
      .then(()=>{
        return clearAll();
      })
      .then(()=>{

        expect(catchCount).toBe(4); //NOTE: this is to make sure that the
                                    //promise is processed until clearAll is fully done
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });

    //Don't think we need this -> it("should be able to undo expired winning bid",function(done){done();});

    //TODO: are we even testing transaction at this point... think about refactoring
    it("should be able to undo pending bid",function(done){
      /*
        lister should be able to cancel bid, and have money go back to highest bidder, and have item back
        Note: a bidder shouldnt be able to cancel a bid on an item

        create acc1, acc2
        create item for acc1
        create listing(item) for acc1
        create bid for acc2 on listing
        cancel listing(item) for acc1
          /acc1 should have item back/
          /acc2 should have money back/
      */
      let acc1 = null;
      let acc2 = null;
      let item = null;
      let listing = null;

      Promise.all([AccountFactory.createAccount('t1', 'password', 'tftom@gmdsfgail.com21', '1000'),
                   AccountFactory.createAccount('t2', 'password', 'tftom@gmdsfgail.com22', '1000')])
      .then((accs)=>{
        acc1 = accs[0];
        acc2 = accs[1];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 1001, 'bid', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return TransactionFactory.bidOnListing(acc2.getId(), listing.getId(), 100);
      })
      .then(()=>{
        return ListingFactory.cancelListing(listing.getItemId(), listing.getId());
      })
      .then(()=>{
        return Promise.all( [ItemFactory.getAccountItems(acc1.getId()),
                            ItemFactory.getAccountItems(acc2.getId())]);
      })
      .then((res)=>{
        //expect acc1, acc2 money to be 1000, 1000
        expect(acc1.getMoney()).toBe(1000);
        expect(acc2.getMoney()).toBe(1000);

        //expect acc1, acc2 to have 1 and 0 items
        expect(res[0].length).toBe(1);
        expect(res[1].length).toBe(0);
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });
  });

  describe("should be able to buyout listing",function(done){
    it("should get item and cost money",function(done){
      let acc1 = null;
      let acc2 = null;
      let item = null;
      let listing = null;
      let trans = null;
      let acc1Items = null;
      let acc2Items = null;
      let acc1Money = null;
      let acc2Money = null;
      Promise.all([AccountFactory.createAccount('testA', 'password', 'tftom@gmdsfgail.com22', '1000'),
              AccountFactory.createAccount('testB', 'password', 'tftom@gmsdfgail.com2', '1000')])
      .then((accounts)=>{
        acc1 = accounts[0];
        acc2 = accounts[1];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 100, 3600*24*1000, 'buyout', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return ItemFactory.getAccountItems(acc1.getId());
      })
      .then((items)=>{
        expect(items.length).toBe(0, "lister must no items");
        return TransactionFactory.buyoutListing(acc2.getId(), listing.getId());
      })
      .then((t)=>{
        trans = t;
        return Promise.all([ItemFactory.getAccountItems(acc1.getId()),
                            ItemFactory.getAccountItems(acc2.getId()),
                            ListingFactory.getListing(listing.getId())]);
      })
      .then((results)=>{
        acc1Items = results[0];
        acc2Items = results[1];
        acc1Money = acc1.getMoney();
        acc2Money = acc2.getMoney();
        listing = results[2];
        expect(acc1Items.length).toBe(0, 'seller should have no items');
        expect(acc2Items.length).toBe(1, 'buyer should have item');
        expect(acc2Items[0].getId()).toBe(item.getId(),'item id should be correct');
        expect(acc1Money).toBe(1100, 'seller should have 1100 money not : ' + acc1Money);
        expect(acc2Money).toBe(900, 'buyer should have 900, not : '+acc2Money);

        /*we're losing the listing reference*/
        expect(listing.isSold()).toBe(true, 'listing should be sold');
        expect(trans.getAmount()).toBe(100, 'transaction amount should be correct, not :' + trans.getAmount());
        expect(trans.getBidderId()).toBe(acc2.getId(), 'trans bidder id should be correct, not : '+ trans.getBidderId());
      })
      .then(()=>{
        return clearAll();
      })
      .then(()=>{
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });

    it("shouldnt be able to buyout listing",function(done){

      /* TODO: convert this to a 'describe' and make 'its' for each test...
        create acc1, acc2
        create item for acc1
        create listing(buyout,item) for acc1
        create listing(bid,item)
          /cant list item twice/
        acc2 buyout listing(item)
          /not enough money/
        acc1 buyout listing(item)
          /cant buyout own listing/
        cancel listing
        create listing(bid,item) for acc1
        buyout listing
          /cant buyout bid/
      */

      let acc1 = null;    let acc2 = null;
      let listing = null;
      let item = null;
      let catchCount = 0;
      Promise.all([AccountFactory.createAccount('testA', 'password', 'tftom@gmdsfgail.com22', '1500'),
              AccountFactory.createAccount('testB', 'password', 'tftom@gmsdfgail.com2', '1000')])
      .then((accounts)=>{
        acc1 = accounts[0];
        acc2 = accounts[1];
        return ItemFactory.createItem('itemA', 'itemDesc', 'www.itemUrl.com', acc1.getId());
      })
      .then((i)=>{
        item = i;
        return ListingFactory.createListing(item.getId(), 1100, 3600*24*1000, 'buyout', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return ListingFactory.createListing(item.getId(), 1100, 3600*24*1000, 'bid', acc1.getId());
      })
      .catch((e)=>{
        expect(e+"").toMatch(/twice/, 'expect: incorrect error occured, expected "cant list item twice", got ' + e);
        catchCount++;
      })
      .then(()=>{
        return TransactionFactory.buyoutListing(acc2.getId(), listing.getId());
      })
      .catch((e)=>{
        expect(e+"").toMatch(/money/, 'expect: incorrect error occured, expected "not enough money to buyout" got ' + e);
        catchCount++;
      })
      .then(()=>{
        return TransactionFactory.buyoutListing(acc1.getId(), listing.getId());
      })
      .catch((e)=>{
        expect(e+"").toMatch(/own/, 'expect: incorrect error occured, expected "cant buyout own listing" got ' + e);
        catchCount++;
      })
      .then(()=>{
        return ListingFactory.cancelAllListings();
      })
      .then(()=>{
        return ListingFactory.createListing(item.getId(), 1100, 3600*24*1000, 'bid', acc1.getId());
      })
      .then((l)=>{
        listing = l;
        return TransactionFactory.buyoutListing(acc1.getId(), listing.getId());
      })
      .catch((e)=>{
        expect(e+"").toMatch(/buyout/, 'expect: incorrect error occured, expected "cant buyout a bid listing" got ' + e);
        catchCount++;
      })
      .then(()=>{
        expect(catchCount).toBe(4, "didnt return all errors, expected 4, got " + catchCount);
        done();
      })
      .catch((e)=>{
        Utility.logError(e);
      });
    });
    //defered: it("should be able to undo buyout", function(done){done();});
  });

  it('should be able to do shutdown cleanup', function(done){
    clearAll().then(()=>{
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });

  });
});
