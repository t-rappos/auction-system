var expect = require('expect');

let AccountFacade = require('../lib/facade/account.js');
let Utility = require('../lib/utility.js');

//let Utility = require('../lib/utility.js');

describe('AccountFacade',function(){

  it('should exist',function(done){
    expect(AccountFacade).toExist();
    done();
  });

  it('should be able to create account', function(done){
    AccountFacade.createAccount('username','email@domain.com', 'password')
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to validate new username', function(done){
    AccountFacade.validateNewUsername('username')
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to validate new email', function(done){
    AccountFacade.validateNewEmail('email@asdf.com')
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to update account', function(done){
    AccountFacade.updateAccount('username', {age: 40, from: 'AUS'})
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to get account details', function(done){
    AccountFacade.getAccountDetails('username')
    .then((res)=>{
      expect(res.age).toBe(40);
      expect(res.from).toBe('AUS');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to remove account', function(done){
    AccountFacade.removeAccount('username')
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });


  it('should be able to get account messages', function(done){
    expect(true).toBe(false);
    done();
  });

  it('should be able to get message detail', function(done){
    expect(true).toBe(false);
    done();
  });

  it('should be able to set message read', function(done){
    expect(true).toBe(false);
    done();
  });

  it('should be able to send message', function(done){
    expect(true).toBe(false);
    done();
  });

  it('should be able to autocomplete username', function(done){
    Promise.all([
      AccountFacade.createAccount('username1','email1@domain.com', 'password'),
      AccountFacade.createAccount('username2','email2@domain.com', 'password')])
    .then(()=>{
        return AccountFacade.autocompleteUsername('username');
    })
    .then((res)=>{
      expect(res.length).toBe(2);
      expect(res[0]).toBe('username1');
      expect(res[1]).toBe('username2');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to verify username exists', function(done){
    AccountFacade.verifyUsernameExists('username')
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to remove all accounts', function(done){
    AccountFacade.removeAllAccounts()
    .then(()=>{done();})
    .catch((e)=>{
      Utility.logError(e);
    });
  });
});
