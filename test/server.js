var expect = require('expect');
//var server = require('../server.js');
var demo = require('../demo.js');

describe('Server',()=>{
  it('should run properly run test',()=>{
    expect(1).toBe(1);
  });

  it('should demo',()=>{
    expect(demo).toExist();
  });

  it('should demo add',()=>{
    var res = demo.add(1,2);
    var exp = 3;
    expect(res).toEqual(exp);
  });


});
