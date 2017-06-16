// var expect = require('expect');
// let User = require('../lib/user.js');
// let Utility = require('../lib/utility.js');
// //let UserList = require('../lib/userList.js');
// let AccountFactory = require('../lib/accountFactory.js');
// let UtilData = require('../lib/utilData.js');
//
// describe('User',function(){
//
//   it('should exist',function(done){
//     expect(User).toExist();
//     done();
//   });
//
//   it('should be able to get username',function(done){
//     let user = new User.User('tom','socketData');
//     expect(user.getUsername()).toBe('tom');
//     done();
//   });
//
//   it('should be able to get socket',function(done){
//     let socket = {data:'socketData'};
//     let user = new User.User('tom',socket);
//     expect(Utility.isEqual(user.getSocket(),socket)).toBe(true);
//     done();
//   });
//
//   it('should be able to check password',function(done){
//     AccountFactory.createAccount('tom','toms-password','toms-email')
//     .then(function(acc){
//       let socket = {id : 5, socketData : 'data'};
//       let user = new  User.User('tom',socket);
//       return Promise.all([
//         user.checkPassword('toms-password'),
//         user.checkPassword('toms-incorrect-password')]);
//     })
//     .then(function(results){
//       let correctPasswordPassed = results[0];
//       let incorrectPasswordPassed = results[1];
//       expect(correctPasswordPassed).toBe(true);
//       expect(incorrectPasswordPassed).toBe(false);
//       return UtilData.clearAllData();
//     })
//     .then(done)
//     .catch((e)=>{
//       Utility.logError(e);
//     });
//   });
// });
