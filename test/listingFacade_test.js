/*get all listings
get account listings
cancel listing
    give item back to seller
    transaction.handleListingCancelled(listing details) //so we dont deal with returning money to bidders

create listing
    remove item from seller*/

let ListingFacade = require('../lib/facade/listing.js');
let ItemFacade = require('../lib/facade/item.js'); 
let Utility = require('../lib/utility.js');
let expect = require('expect');
let Promise = require('bluebird');

describe('ListingFacade', function(){
    it('should exist', function(done){
        expect(ListingFacade).toExist();
        done();
    });

    let sellerAccount1 = null;
    let account2 = null;
    let listedItem1 = null;
    let listedItem2 = null;
    let listing1 = null;
    let listing2 = null;

    it('should do setup', function(done){
        let AccountFacade = require('../lib/facade/account.js');
        Promise.all([AccountFacade.createAccount('testAccount1', 'test1@email.com', 'password', 1000),
                    AccountFacade.createAccount('testAccount2', 'test2@email.com', 'password', 1000)])
        .then((res)=>{
            sellerAccount1 = res[0];
            account2 = res[1];
            return Promise.all([
                ItemFacade.createItem(null, 'testitem1', 'desc2asdas', null, sellerAccount1.id),
                ItemFacade.createItem(null, 'testitem1', 'desc2asdas', null, account2.id)
            ]);
        })
        .then((res)=>{
            listedItem1 = res[0];
            listedItem2 = res[1];
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should be able to remove listings v2', function(done){
        ListingFacade.removeAllTransactions()
        .then(()=>{
            return Promise.all([ListingFacade.getAllListings()]);
        })
        .spread((l1)=>{
            console.log('getAllListings',l1);
            expect(l1.length).toBe(0);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should create listing', function(done){
        Promise.all([
            ListingFacade.createListing(listedItem1.id, 1.00, 10000,'bid',listedItem1.accountId),
            ListingFacade.createListing(listedItem2.id, 1.00, 10000,'buyout',listedItem2.accountId)
        ])
        .spread((listing, l2)=>{
            listing1 = listing;
            listing2 = l2;
            expect(listing.itemId).toBe(listedItem1.id);
            expect(listing.starting_price).toBe(1.00);
            expect(new Date(listing.expiry_date).getTime())
            .toBeGreaterThan(new Date(listing.creation_date).getTime());
            expect(listing.type).toBe('bid');
            expect(listing.sellerId).toBe(listedItem1.accountId);
            return ItemFacade.getAccountItems(sellerAccount1.id);
        })
        .then((res)=>{
            expect(res.length).toBe(0);
            done();
        })        
        .catch((e)=>{
            Utility.logError(e);
        });
    });
    
    it('should get all listings', function(done){
        ListingFacade.getAllListings()
        .then((listings)=>{
            expect(listings.length).toBe(2);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should get account listings', function(done){
        ListingFacade.getAccountListings(sellerAccount1.id)
        .then((listings)=>{
            expect(listings.length).toBe(1);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should bid on listing', function(done){
        ListingFacade.bidOnListing(account2.id, listing1.id, 5.00)
        .then((transaction)=>{
            expect(transaction).toExist();
            expect(transaction.amount).toBe(5.00);
            expect(transaction.bidderId).toBe(account2.id);
            expect(transaction.listingId).toBe(listing1.id);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should buyout listing', function(done){
        ListingFacade.buyoutListing(sellerAccount1.id, listing2.id)
        .then((res)=>{
            let transaction = res.transaction;
            console.log(res);
            console.log(transaction);
            console.log('transaction amount :', transaction.amount);
            expect(transaction).toExist();
            expect(transaction.amount).toBe(1.00);
            expect(transaction.bidderId).toBe(sellerAccount1.id);
            expect(transaction.listingId).toBe(listing2.id);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should cancel listing', function(done){
        Promise.all([ListingFacade.cancelListing(listing1.id),
                     ListingFacade.cancelListing(listing2.id)]) //TODO: can we cancel an expired listing?
        .then(()=>{
            return ItemFacade.getAccountItems(sellerAccount1.id);
        })
        .then((res)=>{
            expect(res.length).toBe(1);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should do shutdown', function(done){
        let AccountFacade = require('../lib/facade/account.js');
        ListingFacade.removeAllTransactions()
        .then(()=>{
            return ItemFacade.removeAllItems();
        })
        .then(()=>{
            return AccountFacade.removeAllAccounts();
        })
        .then(()=>{
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
});