var expect = require('expect');

let Account = require('../lib/account.js');
let AccountFactory = require('../lib/accountFactory.js');

describe('Account',function(){

  it('should exist',function(done){
    expect(Account).toExist();
    done();
  });

  it("should be able to get username",function(done){
    AccountFactory.destroyAllAccounts();

    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    setTimeout(function(){
      expect(account.getUsername()).toBe('tom');
      done();
    },200);
  });

  it("should be able to get password",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    setTimeout(function(){
      expect(account.getPassword()).toBe('password');
      done();
    },200);
  });

  it("should be able to get email",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    setTimeout(function(){
      expect(account.getEmail()).toBe('tom@gmail.com');
      done();
    },200);
  });

  it("should be able to get details",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    let details = {age: '50', reputation : '10'};
    setTimeout(function(){
      AccountFactory._setAccountDetails('tom',details);
    },200);

    setTimeout(function(){
      expect(account.getDetails()).toBe(details);
      done();
    },300);
  });

  it("should be able to get money?",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    let money = 200;
    setTimeout(function(){
      AccountFactory._setMoney('tom',money);
    },200);

    setTimeout(function(){
      expect(account.getMoney()).toBe(money);
      done();
    },300);
  });

  it("should be able to shallowCopy",function(done){
    AccountFactory.destroyAllAccounts();

    let account1 = null;
    let account2 = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account1 = a;});
      AccountFactory.createAccount('andy','pw2','andy@gmail.com',function(a){account2 = a;});
    },100);

    let details = {age: '50', reputation : '10'};
    let money = 200;
    setTimeout(function(){
      AccountFactory._setMoney('andy',money);
      AccountFactory._setAccountDetails('andy',details);
    },200);

    setTimeout(function(){
      account1.shallowCopy(account2);
      expect(account1.getUsername()).toBe('andy');
      expect(account1.getPassword()).toBe('pw2');
      expect(account1.getEmail()).toBe('andy@gmail.com');
      expect(account1.getDetails()).toBe(details);
      expect(account1.getMoney()).toBe(money);
      done();
    },300);
  });

  it("should be able to shallowCopy a null account",function(done){
    AccountFactory.destroyAllAccounts();

    let account1 = null;
    let account2 = null;

    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account1 = a;});
    },100);

    setTimeout(function(){
      account1.shallowCopy(account2);
      expect(account1).toBe(null);
      done();
    },200);
  });

  it("should be able to validate username",function(done){
    expect(Account.validateUsername('tom')).toBe(true);
    done();
  });

  it("should not be able to set username, fails at 2 or less characters",function(done){
    expect(Account.validateUsername('to')).toBe(false);
    done();
  });

  it("should not be able to set username, space",function(done){
    expect(Account.validateUsername('tom is cool')).toBe(false);
    done();
  });

  it("should not be able to set username, symbols",function(done){
    expect(Account.validateUsername('tom!!!@#2$')).toBe(false);
    done();
  });

  it("should not be able to set username, char limit",function(done){
    let username = 'tom ';
    for (var i =0; i < 20; i++){
      username += username;
    }
    expect(Account.validateUsername(username)).toBe(false);
    done();
  });

  it("should be able to validate email",function(done){
    expect(Account.validateEmail('this@asdf.com')).toBe(true);
    expect(Account.validateEmail('')).toBe(false);
    expect(Account.validateEmail('sadfsad@dsafs')).toBe(false);
    expect(Account.validateEmail('sf.com')).toBe(false);
    done();
  });

  it("should be able to validate details",function(done){
    expect(Account.validateDetails({msg:'sdfs',fsdf:'dasfs'})).toBe(true);
    done();
  });

  it("should be able to validate password",function(done){
    expect(Account.validatePassword('tom is cool')).toBe(true);
    expect(Account.validatePassword('')).toBe(false);
    done();
  });

  it("should not be able to set password, min chars",function(done){
    expect(Account.validatePassword('as')).toBe(false);
    done();
  });

  it("should not be able to set password, char limit",function(done){
    let pw = 'tom ';
    for (var i =0; i < 20; i++){
      pw += pw;
    }
    expect(Account.validatePassword(pw)).toBe(false);
    done();
  });

  it("should be able to change password",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    setTimeout(function(){
      account.changePassword('password','new password');
    },200);

    setTimeout(function(){
      expect(account.getPassword()).toBe('new password');
      done();
    },300);
  });

  it("should be able to change email",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    setTimeout(function(){
      account.changeEmail('new@gmail.com');
    },200);

    setTimeout(function(){
      expect(account.getEmail()).toBe('new@gmail.com');
      done();
    },300);
  });

  it("should be able to change details  ",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    let details = {asdf:'asdfs',sdfsad:'dafgh'};

    setTimeout(function(){
      account.changeDetails(details);
    },200);

    setTimeout(function(){
      expect(account.getDetails()).toBe(details);
      done();
    },300);
  });

  it("should be able to check password",function(done){
    AccountFactory.destroyAllAccounts();
    let account = null;
    setTimeout(function(){
      AccountFactory.createAccount('tom','password','tom@gmail.com',function(a){account = a;});
    },100);

    let resulta = false;
    let resultb = false;

    setTimeout(function(){
      account.checkPassword('password',function(r){resulta = r;});
      account.checkPassword('dasfs',function(r){resultb = r;});
    },200);

    setTimeout(function(){
      expect(resulta).toBe(true);
      expect(resultb).toBe(false);
      done();
    },300);
  });

});

/*
  @should be able to get username
  @should be able to get password
  @should be able to get email
  @should be able to get details
  @should be able to get money?

  @should be able to shallowCopy
    @should be able to shallowCopy a null account

  @should be able to validate username
    @should not be able to set password, min chars
    @should not be able to set username, space
    @should not be able to set username, symbols
    @should not be able to set username, char limit

  @should be able to validate email

  @should be able to validate details

  @should be able to validate password
    @should not be able to set password, min chars
    @should not be able to set password, char limit

  @should be able to change password
  @should be able to change email
  @should be able to change details
  @should be able to check password
*/
