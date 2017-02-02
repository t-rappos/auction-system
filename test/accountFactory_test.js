
let AccountFactory = require('../lib/accountFactory.js');
//let Account = require('./lib/account.js');

describe('AccountFactory',function(){

  it('should exist',function(done){
    expect(AccountFactory).toExist();
    done();
  });

  it("should be able to destroy all accounts", function(done){
    AccountFactory.destroyAllAccounts();

    setTimeout(function(){
      AccountFactory.createAccount('tom', 'password', 'tom@gmail.com');
      AccountFactory.createAccount('andy', 'password', 'andy@gmail.com');
    },100);


    setTimeout(function(){
      AccountFactory.destroyAllAccounts();
    },200);

    let accounts = [];
    let acc = null; // eslint-disable-line no-unused-vars

    setTimeout(function(){
       AccountFactory.getAllAccounts(function(accountList){
         accounts = accountList;
       });
       AccountFactory.getAccount('tom',function(a){
         acc = a;
       });
    },300);

    let emptyArray = [];

    setTimeout(function(){
      expect(accounts).toBe(emptyArray);
      expect().toBe(null);
      done();
    },400);

  });

  it("should be able to create an account",function(done){

    AccountFactory.destroyAllAccounts();

    let username = 'tom';
    let password = 'password';
    let email = 'tom@gmail.com';
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount(username, password, email, function(acc){account = acc;});
    },100);

    let emptyArray = [];
    setTimeout(function(){
      expect(account).toExist();
      expect(account.getUsername()).toBe(username);
      expect(account.getPassword()).toBe(password);
      expect(account.getEmail()).toBe(email);
      expect(account.getDetails()).toBe(emptyArray);
      expect(AccountFactory.getAccount('tom')).toNotBe(null);
      done();
    },200);
  });

  it("should be able to destroy an account",function(done){

    AccountFactory.destroyAllAccounts();

    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom', 'password', 'tom@gmail.com',function(a){account= a;});
    },100);

    setTimeout(function(){
      AccountFactory.destroyAccount();
    },200);

    setTimeout(function(){
      expect(account).toBe(null);
      expect(AccountFactory.getAccount('tom')).toBe(null);
      done();
    },300);
  });

  it("should be able to get account",function(done){
    AccountFactory.destroyAllAccounts();

    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom', 'password', 'tom@gmail.com',function(a){account = a;});
    },100);

    let dbAccount = null;
    setTimeout(function(){
      AccountFactory.getAccount('tom',function(a){dbAccount = a;});
    },200);

    setTimeout(function(){
      expect(account).toBe(dbAccount);
      expect(account.getUsername()).toBe(dbAccount.getUsername());
      expect(account.getPassword()).toBe(dbAccount.getPassword());
      expect(account.getEmail()).toBe(dbAccount.getEmail());
      expect(account.getDetails()).toBe(dbAccount.getDetails());
      done();
    },300);
  });

  it("should be able to get all accounts",function(done){
    AccountFactory.destroyAllAccounts();

    setTimeout(function(){
      AccountFactory.createAccount('tom', 'password', 'tom@gmail.com');
      AccountFactory.createAccount('andy', 'password', 'andy@gmail.com');
    },100);

    let accounts = [];
    setTimeout(function(){
      AccountFactory.getAllAccounts(function(accs){accounts = accs;});
    },200);

    setTimeout(function(){
      expect(accounts.length).toBe(2);
      done();
    },300);
  });

  it("should reload account after modifying its database record",function(done){
    AccountFactory.destroyAllAccounts();

    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom', 'password', 'tom@gmail.com',function(a){account = a;});
    },100);

    let result = false;  // eslint-disable-line no-unused-vars
    setTimeout(function(){
      AccountFactory._changeAccountPassword('tom','newPassword',function(r){result = r;});
    },100);

    setTimeout(function(){
      expect(account.getPassword()).toBe('newPassword');
      done();
    },200);

    setTimeout(function(){},300);
  });

  it("should provide a list of account autocomplete suggestions",function(done){
    AccountFactory.destroyAllAccounts();
    setTimeout(function(){
      AccountFactory.createAccount('tom1', 'password', 'tom@gmail.com');
      AccountFactory.createAccount('tom2', 'password', 'tom@gmail.com');
      AccountFactory.createAccount('tom3', 'password', 'tom@gmail.com');
      AccountFactory.createAccount('tom4', 'password', 'tom@gmail.com');
      AccountFactory.createAccount('tom5', 'password', 'tom@gmail.com');
    },100);

    let autocompleteList =[];
    setTimeout(function(){
      AccountFactory.getAutocompletedUsernames('tom',function(acl){autocompleteList = acl;});
    },200);
    setTimeout(function(){
      expect(autocompleteList.length).toBe(5);
      done();
    },300);
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
