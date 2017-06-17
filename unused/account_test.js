//  var expect = require('expect');
//
//  let Account = require('../lib/account.js');
//  let AccountFactory = require('../lib/accountFactory.js');
//  let Utility = require('../lib/utility.js');
//  //let UtilData = require('../lib/utilData.js');
//
//  function runTests(){
//  describe('Account',function(){
//
//    it('should exist',function(done){
//      expect(Account).toExist();
//      done();
//    });
//
//    it("should be able to get username",function(done){
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(account){
//        expect(account.username).toBe('tom');
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to get password",function(done){
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(account){
//        expect(account.password).toBe('password');
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to get email",function(done){
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(account){
//        expect(account.email).toBe('tom@gmail.com');
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to get details",function(done){
//      let account = null;
//      let details = {age: '50', reputation : '10'};
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(acc){
//        account = acc;
//        return AccountFactory.changeAccountDetails(account,details);
//      })
//      .then(function(){
//        let comparison = Utility.debugCompare(details,account.details, 'should be able to get details',true);
//        expect(comparison).toBe(true);
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to get money",function(done){
//      let account = null;
//      let money = 200;
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(acc){
//        account = acc;
//        return AccountFactory.changeAccountMoney(account,money);
//      })
//      .then(()=>{
//        return AccountFactory.getAccountFromId(account.id);
//      })
//      .then(function(acc){
//        expect(acc.money).toBe(money);
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
// /*
//    it("should be able to shallowCopy",function(done){
//      let account1 = null;
//      let account2 = null;
//      let details = {age: '50', reputation : '10'};
//      let money = 200;
//
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return Promise.all([AccountFactory.createAccount('tom','password','tom@gmail.com'),
//                            AccountFactory.createAccount('andy','pw2','andy@gmail.com')])
//          .then(function(results){
//            account1 = results[0];
//            account2 = results[1];
//          });
//      })
//      .then(function(){
//        return Promise.all([AccountFactory._changeAccountMoney(account2,money),
//                            AccountFactory._changeAccountDetails(account2,details)]);
//      })
//      .then(function(){
//        account1.shallowCopy(account2);
//        expect(account1.username).toBe('andy');
//        expect(account1.password).toBe('pw2');
//        expect(account1.email).toBe('andy@gmail.com');
//        expect(Utility.isEqual(account1.details,details)).toBe(true);
//        expect(account1.money).toBe(money);
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to shallowCopy a null account",function(done){
//      let account2 = null;
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(acc){
//        acc.shallowCopy(account2);
//        expect(acc.username).toBe(null);
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to compare accounts",function(done){
//      let account1 = null;
//      let account2 = null;
//
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return Promise.all([
//          AccountFactory.createAccount('tom','password','tom@gmail.com'),
//          AccountFactory.createAccount('to342m','pass123word','tom@324gmail.com')]);
//      }).then(function(results){
//        account1 = results[0];
//        account2 = results[1];
//        expect(account1.equals(account1)).toBe(true);
//        expect(account1.equals(account2)).toBe(false);
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
// */
// /*
//    it("should be able to validate username",function(done){
//      expect(Account.validateUsername('tom')).toBe(true);
//      done();
//    });
//
//    it("should not be able to set username, fails at 2 or less characters",function(done){
//      expect(Account.validateUsername('to')).toBe(false);
//      done();
//    });
//
//    it("should not be able to set username, space",function(done){
//      expect(Account.validateUsername('tom is cool')).toBe(false);
//      done();
//    });
//
//    it("should not be able to set username, symbols",function(done){
//      expect(Account.validateUsername('tom!!!@#2$')).toBe(false);
//      done();
//    });
//
//    it("should not be able to set username, char limit",function(done){
//      let username = 'tom ';
//      for (var i =0; i < 20; i++){
//        username += username;
//      }
//      expect(Account.validateUsername(username)).toBe(false);
//      done();
//    });
//
//    it("should be able to validate email",function(done){
//      expect(Account.validateEmail('this@asdf.com')).toBe(true);
//      expect(Account.validateEmail('')).toBe(false);
//      expect(Account.validateEmail('sadfsad@dsafs')).toBe(false);
//      expect(Account.validateEmail('sf.com')).toBe(false);
//      done();
//    });
//
//    it("should be able to validate details",function(done){
//      expect(Account.validateDetails({msg:'sdfs',fsdf:'dasfs'})).toBe(true);
//      done();
//    });
//
//    it("should be able to validate password",function(done){
//      expect(Account.validatePassword('tom is cool')).toBe(true);
//      expect(Account.validatePassword('')).toBe(false);
//      done();
//    });
//
//    it("should not be able to set password, min chars",function(done){
//      expect(Account.validatePassword('as')).toBe(false);
//      done();
//    });
//
//    it("should not be able to set password, char limit",function(done){
//      let pw = 'tom ';
//      for (var i =0; i < 20; i++){
//        pw += pw;
//      }
//      expect(Account.validatePassword(pw)).toBe(false);
//      done();
//    });
//    */
//    it("should be able to change password",function(done){
//      let account = null;
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(acc){
//        account = acc;
//        return AccountFactory.changeAccountPassword(account, 'password','new password');
//      })
//      .then(()=>{
//        return AccountFactory.getAccountFromId(account.id);
//      })
//      .then(function(acc){
//        expect(acc.password).toBe('new password');
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    it("should be able to change email",function(done){
//      let account = null;
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(acc){
//        account = acc;
//        return AccountFactory.changeAccountEmail(account, 'new@gmail.com');
//      })
//      .then(()=>{
//        return AccountFactory.getAccountFromId(account.id);
//      })
//      .then(function(acc){
//        expect(acc.email).toBe('new@gmail.com');
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    //it("should be able to change details  ",function(done){
//   //   let account = null;
//   //   let details = {asdf:'asdfs',sdfsad:'dafgh'};
//   //   AccountFactory.destroyAllAccounts()
//   //   .then(function(){
//   //     return AccountFactory.createAccount('tom','password','tom@gmail.com');
//   //   })
//   //   .then(function(acc){
//   //     account = acc;
//   //     return AccountFactory.changeAccountDetails(account, details);
//   //   })
//   //   .then(()=>{
//   //     return AccountFactory.getAccountFromId(account.id);
//   //   })
//   //   .then(function(acc){
//   //     console.log(details);
//   //     console.log(acc.details);
//   //     expect(Utility.debugCompare(acc.details,details)).toBe(true);
//   //     done();
//   //   })
//   //   .catch(function(e){
//   //     Utility.logError(e);
//   //   });
//    //});
//
//    it("should be able to check password",function(done){
//      AccountFactory.destroyAllAccounts()
//      .then(function(){
//        return AccountFactory.createAccount('tom','password','tom@gmail.com');
//      })
//      .then(function(account){
//        expect(account.password==='password').toBe(true);
//        expect(account.password==='dasfs').toBe(false);
//        done();
//      })
//      .then(()=>{
//        //return UtilData.clearAllData();
//        return AccountFactory.destroyAllAccounts();
//      })
//      .then(()=>{
//        done();
//      })
//      .catch(function(e){
//        Utility.logError(e);
//      });
//    });
//
//    });
//  }
//
//
//  setTimeout(runTests,500);
//
//  /*
//    @should be able to get username
//    @should be able to get password
//    @should be able to get email
//    @should be able to get details
//    @should be able to get money?
//
//    @should be able to shallowCopy
//      @should be able to shallowCopy a null account
//
//    @should be able to validate username
//      @should not be able to set password, min chars
//      @should not be able to set username, space
//      @should not be able to set username, symbols
//      @should not be able to set username, char limit
//
//    @should be able to validate email
//
//    @should be able to validate details
//
//    @should be able to validate password
//      @should not be able to set password, min chars
//      @should not be able to set password, char limit
//
//    @should be able to change password
//    @should be able to change email
//    @should be able to change details
//    @should be able to check password
//  */
