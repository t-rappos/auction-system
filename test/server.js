var expect = require('expect');
//var server = require('../server.js');
var demo = require('../demo.js');
var server = require('../lib/server.js');
let abc = 's';
import http from 'http';
import assert from 'assert';

import '../lib/server.js';

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



  describe('Example Node Server', () => {
    it('should return 200', done => {
      http.get('http://127.0.0.1:3000', res => {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

});
