var expect = require('expect');

let Utility = require('../lib/utility.js');
//let Account = require('./lib/account.js');

describe('Utility',function(){

  it('should exist',function(done){
    expect(Utility).toExist();
    done();
  });

  describe('isAlphaNumeric',function(){
    it('should pass alphanum value',function(done){
      expect(Utility.isAlphaNumeric('asdf2342dssa')).toBe(true);
      done();
    });
    it('should fail whitespace value',function(done){
      expect(Utility.isAlphaNumeric('asdf23 42dssa')).toBe(false);
      done();
    });
    it('should fail null value',function(done){
      expect(Utility.isAlphaNumeric('')).toBe(false);
      done();
    });
    it('should fail symbolic value',function(done){
      expect(Utility.isAlphaNumeric('!@$123--sadfas')).toBe(false);
      done();
    });
    it('should fail no value',function(done){
      expect(Utility.isAlphaNumeric()).toBe(false);
      done();
    });
  });

  describe('isString',function(){
    it('should pass string value',function(done){
      expect(Utility.isString('asdf2342dssa')).toBe(true);
      done();
    });
    it('should pass string object',function(done){
      expect(Utility.isString(new String('asdassdadssad'))).toBe(true);
      done();
    });
    it('should fail number',function(done){
      expect(Utility.isString(1234)).toBe(false);
      done();
    });
    it('should fail null string',function(done){
      expect(Utility.isString('')).toBe(false);
      done();
    });
    it('should fail no value',function(done){
      expect(Utility.isString()).toBe(false);
      done();
    });
  });
});
