var expect = require('expect');
//let Utility = require('../lib/utility.js');
let server = require('../lib/server.js');
let DB = require('../lib/serverDB.js');
describe('DB',function(){
     it('should exist',function(done){
     expect(server).toExist();
      setTimeout(()=>{ //wait for server to init
      done();
     },1000);
   });
   it('should exist2',function(done){
     expect(DB).toExist();
     setTimeout(()=>{
      done();
     },1000);
   });
    /*
   it('should initialise', function(done){
     Utility.log("about to initialise database");
     DB.initialise()
     .then(()=>{
      Utility.log('db initialised');
      done();
     })
     .catch((e)=>{
       Utility.logError(e);
     });
   });
    */
});
