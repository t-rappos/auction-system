var expect = require('expect');
var server = require('../server.js');


describe('Server',()=>{
  it('should run properly run test',()=>{
    expect(1).toBe(1);
  });

  it('should run properly run test',()=>{
    expect(server).toExist();
  });

});
