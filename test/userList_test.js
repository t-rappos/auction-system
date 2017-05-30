var expect = require('expect');
let UserList = require('../lib/userList.js');
let AccountFactory = require('../lib/accountFactory.js');
let ListingFactory = require('../lib/listingFactory.js');
let TransactionFactory = require('../lib/transactionFactory.js');

describe('UserList',function(){

  it('should be able to do startup cleanup', function(done){
    TransactionFactory.removeAllTransactions()
    .then(()=>{
      console.log("after remove trans");
      return ListingFactory.cancelAllListings();
    })
    .then(()=>{
      console.log("after remove listings");
      return AccountFactory.destroyAllAccounts();
    })
    .then(()=>{
      console.log("after remove accounts");
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it('should be able to login with correct details',function(done){
    UserList.logoutAllUsers();
    let socket = {id : 4, socketData: 'data'};
    AccountFactory.createAccount('tom','toms-password','toms-email').
    then(function(acc){
      return UserList.login('tom','toms-password',socket);
    })
    .then(function(loginResult){
      expect(UserList.getNumberOfUsers()).toBe(1);
      UserList.logoutAllUsers();
      expect(UserList.getNumberOfUsers()).toBe(0);
      return AccountFactory.destroyAllAccounts();
    }).then(function(){
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it('should not be able to login twice',function(done){
    UserList.logoutAllUsers();
    let socket = {id : 4, socketData: 'data'};
    AccountFactory.createAccount('tom','toms-password','toms-email').
    then(function(acc){
      return UserList.login('tom','toms-password',socket);
    })
    .then(function(){
      return UserList.login('tom','toms-password',socket);
    }).catch(function(e){
      expect(UserList.getNumberOfUsers()).toBe(1);
      done();
      console.log(e);
      return AccountFactory.destroyAllAccounts();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it('should not be able to login with incorrect details',function(done){
    UserList.logoutAllUsers();
    let socket = {id : 4, socketData: 'data'};
    AccountFactory.createAccount('tom','toms-password','toms-email').
    then(function(acc){
      return UserList.login('tom','not-toms-password',socket);
    })
    .catch(function(e){
      expect(UserList.getNumberOfUsers()).toBe(0);
      return AccountFactory.destroyAllAccounts();
    })
    .then(function(){
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it('should be able to logout',function(done){
    UserList.logoutAllUsers();
    let socket = {id : 4,socketData: 'data'};
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom','toms-password','toms-email');
    })
    .then(function(acc){
      return UserList.login('tom','toms-password',socket);
    })
    .then(function(loginResult){
      expect(UserList.getNumberOfUsers()).toBe(1);
      return UserList.logout(socket);
    }).then(function(){
      expect(UserList.getNumberOfUsers()).toBe(0);
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it('should should throw error when logging out using an unkown socket',function(done){
    UserList.logoutAllUsers();
    let socket = {id: 5, socketData: 'data'};
    let socket2 = {id: 4, socketData: 'otherData'};
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom','toms-password','toms-email');
    })
    .then(function(acc){
      return UserList.login('tom','toms-password',socket);
    })
    .then(function(loginResult){
      expect(UserList.getNumberOfUsers()).toBe(1);
      return UserList.logout(socket2);
    }).catch(function(e){
      expect(UserList.getNumberOfUsers()).toBe(1);
      return AccountFactory.destroyAllAccounts();
    }).then(function(){
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

  it('should be able to get username from socket',function(done){
    UserList.logoutAllUsers();
    let socket = {id: 5, socketData: 'data'};
    AccountFactory.destroyAllAccounts()
    .then(function(){
      return AccountFactory.createAccount('tom','toms-password','toms-email');
    })
    .then(function(acc){
      return UserList.login('tom','toms-password',socket);
    })
    .then(function(loginResult){
      expect(UserList.getUsername(socket)).toBe('tom');
      return AccountFactory.destroyAllAccounts();
    })
    .then(function(){
      done();
    })
    .catch((e)=>{
      console.log(e);
      throw(e);
    });
  });

});
