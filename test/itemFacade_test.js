/*
create_item
create_test_item
get_image_list // image_facade
get_all_player_items
*/

let ItemFacade = require('../lib/facade/item.js');
let Utility = require('../lib/utility.js');
let ownerAccount = null;
let expect = require('expect');


describe('ItemFacade', function(){
    it('should exist', function(done){
        expect(ItemFacade).toExist();
                ItemFacade.removeAllItems()
        .then(()=>{
            return ItemFacade.removeAllImages();
        })
        .then(()=>{
            return require('../lib/facade/account.js').removeAllAccounts();
        })
        .then(()=>{
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
        
    });

    it('should be able to do setup', function(done){
        require('../lib/facade/account.js').createAccount('testAccount', 'testAccount@testDomain.com', 'password')
        .then((res)=>{
            ownerAccount = res;
        })
        .then(()=>{
            return Promise.all([ItemFacade.createImage('im1', 'www.im1.com'),
                ItemFacade.createImage('im2', 'www.im2.com')]);
        })
        .then(()=>{
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });
    it('should create item',function(done){
        ItemFacade.createItem(null, 'itemName', 'itemDescription', null, ownerAccount.id)
        .then(()=>{
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should create test item',function(done){
        ItemFacade.createTestItem('testItemName', 'testItemDesc', 500, ownerAccount.id)
        .then((res)=>{
            expect(res.name).toBe('testItemName');
            expect(res.description).toBe('testItemDesc');
            expect(res.id).toBe(500);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should get image list',function(done){
        ItemFacade.getImageList()
        .then((res)=>{
            expect(res.length).toBe(2);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should get player items',function(done){
        ItemFacade.getAccountItems(ownerAccount.id)
        .then((res)=>{
            expect(res.length).toBe(2);
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

    it('should do cleanup',function(done){
        ItemFacade.removeAllItems()
        .then(()=>{
            return ItemFacade.removeAllImages();
        })
        .then(()=>{
            return require('../lib/facade/account.js').removeAllAccounts();
        })
        .then(()=>{
            done();
        })
        .catch((e)=>{
            Utility.logError(e);
        });
    });

});

