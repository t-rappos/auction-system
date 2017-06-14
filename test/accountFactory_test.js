var expect = require('expect');
let Utility = require('../lib/utility.js');
let AccountFactory = require('../lib/accountFactory.js');
let DB = require('../lib/serverDB.js');
let UtilData = require('../lib/utilData.js');

Utility.log("about to initialise database");
DB.initialise().then(function(){
  Utility.log('dn initialise');
});

function runTests(){

describe('AccountFactory',function(){

  it('should exist',function(done){
    expect(AccountFactory).toExist();
    done();
  });

  it("should be able to destroy all accounts", function(done){
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return Promise.all([
        AccountFactory.createAccount('tom', 'password', 'tom@gmail.com'),
        AccountFactory.createAccount('andy', 'password', 'andy@gmail.com')
      ]);
    })
    .then(function(){
      return AccountFactory.destroyAllAccounts();
    })
    .then(function(){
      return Promise.all([
        AccountFactory.getAllAccounts(),
        AccountFactory.getAccount('tom')
      ]);
    })
    .then(function(results){
      expect(results[0].length).toBe(0); //number of accounts
      expect(results[1]).toBe(null); //no account named tom
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to create an account",function(done){

    let username = 'tom';
    let password = 'password';
    let email = 'tom@gmail.com';

    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount(username, password, email);
    })
    .then(function(account){
      expect(account).toNotBe(null);
      expect(account.getUsername()).toBe(username);
      expect(account.getPassword()).toBe(password);
      expect(account.getEmail()).toBe(email);
      expect(typeof account.getDetails()).toBe('object');
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to destroy an account",function(done){

    let account = null;
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom', 'password', 'tom@gmail.com');
    })
    .then(function(acc){
      account = acc;
      return AccountFactory.destroyAccount(account);
    })
    .then(function(){
      expect(account.getUsername()).toBe(null);
      expect(account.getEmail()).toBe(null);
      expect(account.getPassword()).toBe(null);
      return AccountFactory.getAccount('tom');
    })
    .then(function(acc){
      expect(acc).toBe(null);
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get account",function(done){
    let account = null;
    let dbAccount = null;
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom', 'password', 'tom@gmail.com');
    })
    .then(function(acc){
      account = acc;
      return AccountFactory.getAccount('tom');
    })
    .then(function(acc){
      dbAccount = acc;
      expect(account.equals(dbAccount)).toBe(true);
      expect(account.getUsername()).toBe(dbAccount.getUsername());
      expect(account.getPassword()).toBe(dbAccount.getPassword());
      expect(account.getEmail()).toBe(dbAccount.getEmail());
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get all accounts",function(done){
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return Promise.all([
        AccountFactory.createAccount('tom', 'password', 'tom@gmail.com'),
        AccountFactory.createAccount('andy', 'password', 'andy@gmail.com')
      ]);
    })
    .then(function(){
      return AccountFactory.getAllAccounts();
    })
    .then(function(accounts){
      expect(accounts.length).toBe(2);
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should reload account after modifying its database record",function(done){
    let account = null;
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom', 'password', 'tom@gmail.com');
    })
    .then(function(acc){
      account = acc;
      return AccountFactory._changeAccountPassword(account,'newPassword');
    })
    .then(function(){
      expect(account.getPassword()).toBe('newPassword');
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should provide a list of account autocomplete suggestions",function(done){

    AccountFactory.destroyAllAccounts()
    .then(function(){
      return Promise.all([
        AccountFactory.createAccount('tom1', 'password', 'tom@gmail.com'),
        AccountFactory.createAccount('tom2', 'password', 'tom@gmail.com'),
        AccountFactory.createAccount('sadfs', 'password', 'tom@gmail.com'),
        AccountFactory.createAccount('tom4', 'password', 'tom@gmail.com'),
        AccountFactory.createAccount('tom5', 'password', 'tom@gmail.com')
      ]);
    })
    .then(function(){
      return AccountFactory.getAutocompletedUsernames('tom');
    })
    .then(function(list){
      expect(list.length).toBe(4);
      expect(list[0]).toBe('tom1');
      done();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });

  it("should cache accounts, and only store one", function(done){
    let account = null;
    let accountCopy = null;
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom1', 'password', 'tom@gmail.com');
    })
    .then((acc)=>{
      account = acc;
      return AccountFactory.getAccountFromId(account.getId());
    })
    .then((acc2)=>{
      accountCopy = acc2;
      return accountCopy.changeMoney(100);
    })
    .then(()=>{
      expect(accountCopy.getMoney()).toBe(account.getMoney(),
      "both account references should have the same amount of money");
      done();
    })
    .then(()=>{
      return UtilData.clearAllData();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
  /* @ = tested
  @should be able to destroy all accounts
  @should be able to create an account
    should not be able to create a duplicate account
    should not be able to create an account if the email is taken
  @should be able to destroy an account
    should complain when destroying an invalid account
  @should be able to get account
      should return null when getting an invalid account
  @should be able to get all accounts
  @should reload account after modifying its database record
  @should provide a list of account autocomplete suggestions
  */

});

}

setTimeout(runTests,500);
