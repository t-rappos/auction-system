var expect = require('expect');
let Utility = require('../lib/utility.js');
let DB = require('../lib/serverDB.js');

describe('DB',function(){
   it('should exist',function(done){
     expect(DB).toExist();
     done();
   });
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
});
