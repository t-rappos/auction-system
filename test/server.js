/*node/no-unpublished-require*/

var expect = require('expect');
var server = require('../lib/server.js');

var http = require('http');
var io = require('socket.io-client');//require('socket.io')(http);
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

  describe('login', function(){
    it('should notify all users if user logs in', function(done){
      let client1 = io.connect(socketURL, options);
      let client2 = io.connect(socketURL, options);

      //client 2 should be notified when client 1 logs in
      client2.on('login', function(username){
        expect(username).toBe('tom');
      });

      let resultFn = expect.createSpy();

      client1.emit('login','tom',resultFn);

      setTimeout(function(){
        expect(resultFn).toHaveBeenCalledWith(true);
        client1.disconnect();
        client2.disconnect();
        done();
      },50);
    });

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

  describe('Logout', function(){
    it('should notify users that a logout event for user has occured', function(done){
      let client1 = io.connect(socketURL, options);
      let client2 = io.connect(socketURL, options);

      //client 2 should be notified when client 1 logs in
      client2.on('logout', function(username){
        expect(username).toBe('tom');
      });

      let resultFn = expect.createSpy();

      client1.emit('login','tom',()=>{});

      setTimeout(function(){
        client1.emit('logout','tom',resultFn);
      },10);

      setTimeout(function(){
        expect(resultFn).toHaveBeenCalledWith(true);
        client1.disconnect();
        client2.disconnect();
        done();
      },50);
    });
  });

  describe('onUserDisconnection',function(){
    it('should log out user and notify all online users',function(done){
      let client1 = io.connect(socketURL, options);
      let client2 = io.connect(socketURL, options);

      //client 2 should be notified when client 1 logs in
      client2.on('logout', function(username){
        expect(username).toBe('tom');
      });


      client1.emit('login','tom',()=>{});

      setTimeout(function(){
        client1.disconnect();
      },10);

      setTimeout(function(){
        client2.disconnect();
        done();
      },50);
      });
    });

  describe('onMessage',function(){
    it('should broadcast message to all clients',function(done){
      let client1 = io.connect(socketURL, options);
      let client2 = io.connect(socketURL, options);

      client1.on('message', function(msg){
        expect(msg.author).toBe('tom');
        expect(msg.message).toBe('message contents');
        expect(msg.date).toExist();
      });
      client2.on('message', function(msg){
        expect(msg.author).toBe('tom');
        expect(msg.message).toBe('message contents');
        expect(msg.date).toExist();
      });

      let resultFn = expect.createSpy();
      client1.emit('message',{author:'tom', message:'message contents'},resultFn);

      setTimeout(function(){
        expect(resultFn).toHaveBeenCalledWith(true);
        client1.disconnect();
        client2.disconnect();
        done();
      },50);
    });
  });

  describe('onGetMessagesRequest',function(){
    it('should return a list of messages',function(done){
      let client1 = io.connect(socketURL, options);

      let msgs = null;
      client1.emit('get_messages',(res)=>{msgs=res;});

      setTimeout(function(){
        expect(msgs).toExist();
        expect(msgs.length).toBeGreaterThan(0);
        client1.disconnect();
        done();
      },50);
    });
  });

  describe('onGetUsersRequest',function(){
    it('should return a list of users',function(done){
      let client1 = io.connect(socketURL, options);
      client1.emit('login','tom',()=>{});

      let users = null;
      client1.emit('get_users',(res)=>{users=res;});

      setTimeout(function(){
        expect(users).toExist();
        expect(users.length).toBeGreaterThan(0);
        client1.disconnect();
        done();
      },50);
    });
});
});
/*
  checkCallback
    should throw error & result false when callback is not passed
    should throw error & result false when callback is null
    should throw error & result false when callback is string
    should throw error & result false when callback is number
    should return true when callback is a function (tested by successful login/logout)


  onLogin
    @ should notify all users if user logs in
    should not notify all users if a logged in user logs in

  logout
    should not notify users if user wasn't logged in but tries to logout
    @ should notify users that a logout event for user has occured

  onUserConnection


  onUserDisconnection
    @should log out user and notify all online users

  onMessage
    @should broadcast message to all clients

  onGetMessagesRequest
    @should return a list of messages

  onGetUsersRequest
    @should return a list of users



    stashMessages
*/
