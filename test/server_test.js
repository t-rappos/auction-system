/*node/no-unpublished-require*/

var expect = require('expect');
var server = require('../lib/server.js');

var http = require('http');
var io = require('socket.io-client');
var assert =  require('assert');

let socketAddr = 'http://localhost:';
let socketPort = process.env.PORT || 3000;
let socketURL = socketAddr+socketPort;

let options ={
  transports: ['websocket'],
  'force new connection': true
};

describe('Server',function(){

  it('should connect to socket io 1',function(done){
    let client1 = io.connect(socketURL, options);
    client1.on('connect', function(data){
      done();
    });
    expect(client1).toExist();
  });

  it('should run properly run test',function(done){
    expect(server).toExist();
    done();
  });

  describe('Example Node Server', function(){
    it('should return 200', function(done){
      http.get('http://127.0.0.1:'+(process.env.PORT || 3000), res => {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

});
