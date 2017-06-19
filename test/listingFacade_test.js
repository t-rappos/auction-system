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

describe('ListingFacade', function(){
    it('should exist', function(done){
        expect(ListingFacade).toExist();
        done();
    });

    let sellerAccount1 = null;
    let sellerAccount2 = null;
    let listedItem1 = null;
    //let listedItem2 = null;
    let listing1 = null;

    it('should do setup', function(done){
        let AccountFacade = require('../lib/facade/account.js');
        Promise.all([AccountFacade.createAccount('testAccount1', 'test1@email.com', 'password'),
        AccountFacade.createAccount('testAccount2', 'test2@email.com', 'password')])
        .then((res)=>{
            sellerAccount1 = res[0];
            sellerAccount2 = res[1];
            return Promise.all([
                ItemFacade.createItem(null, 'testitem1', 'desc2asdas', null, sellerAccount1.id),
                ItemFacade.createItem(null, 'testitem1', 'desc2asdas', null, sellerAccount2.id)
            ]);
        })
        .then((res)=>{
            listedItem1 = res[0];
            //listedItem2 = res[1];
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should create listing', function(done){
        ListingFacade.createListing(listedItem1.id, 1.00, 10000,'bid',listedItem1.accountId)
        .then((listing)=>{
            listing1 = listing;
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
            expect(listings.length).toBe(1);
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

    it('should cancel listing', function(done){
        ListingFacade.cancelListing(listing1.id)
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
        
        ItemFacade.removeAllItems()
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