
var expect = require('expect');
let MessageFactory = require('../lib/messageFactory.js');
let AccountFactory = require('../lib/accountFactory.js');

describe('MessageFactory',function(){

  it('should exist',function(done){
    expect(MessageFactory).toExist();
    done();
  });

  it('should be able to be initialised',function(done){
    MessageFactory.initialise(function(){}).then(function(){
      done();
    }).catch(function(e){
      console.log(e);
      throw e;
    }).then(function(){
      return Promise.all([AccountFactory.createAccount('tom','toms-pw','email@email.com'),
      AccountFactory.createAccount('andy','andys-pw','email@email.com')]);
    });
  });

  it('should be able to delete all messages',function(done){
      MessageFactory.deleteAllMessages()
      .then(function(){
        let msg = MessageFactory.createMessage('tom','andy','hi andy','message details');
        return Promise.all([
          MessageFactory.sendMessage(msg),
          MessageFactory.sendMessage(msg),
          MessageFactory.sendMessage(msg)
        ]);
      })
      .then(function(){
        return MessageFactory.getUserMessages('andy');
      })
      .then(function(messages){
        expect(messages.length).toBe(3);
        return MessageFactory.deleteAllMessages();
      })
      .then(function(){
        return MessageFactory.getUserMessages('andy');
      })
      .then(function(messages){
        expect(messages.length).toBe(0);
        done();
      });
  });

  it('should be able to delete message',function(done){
    MessageFactory.deleteAllMessages().then(function(){
      let msg = MessageFactory.createMessage('tom','andy','hi andy','message details');
      return MessageFactory.sendMessage(msg);
    })
    .then(function(){
      return MessageFactory.getUserMessages('andy');
    })
    .then(function(messages){
      expect(messages.length).toBe(1);
      return MessageFactory.deleteMessage(messages[0]);
    })
    .then(function(){
      return MessageFactory.getUserMessages('andy');
    })
    .then(function(messages){
      expect(messages.length).toBe(0);
      done();
    });
  });

  it('should be able to create message',function(done){
    let msg = MessageFactory.createMessage('tom','andy','hi andy','message details');
    expect(msg).toExist().toNotBe(null).toNotBe('');
    done();
  });

  it('should be able to send message',function(done){
    //let spy = expect.createSpy();
    //MessageFactory._messageSent = function(){console.log("TEST: _messageSent called");};
    MessageFactory.deleteAllMessages().then(function(){
      let msg = MessageFactory.createMessage('tom','andy','hi andy','message details');
      return MessageFactory.sendMessage(msg);
    })
    .then(function(){
      return Promise.all([
        MessageFactory.getUserMessages('andy'),
        MessageFactory.getUserMessages('tom')
      ]);
    })
    .then(function(results){
      let andysMessages = results[0];
      let tomsMessages = results[1];
      expect(andysMessages.length).toBe(1);
      expect(tomsMessages.length).toBe(0);
      //expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('should be able to set message as read',function(done){
    MessageFactory.deleteAllMessages().then(function(){
      let msg = MessageFactory.createMessage('sendertom','recieverandy','title','message contents');
      msg._setRead = expect.createSpy();
      msg.setRead();
      expect(msg.isRead()).toBe(true);
      expect(msg._setRead).toHaveBeenCalled();
      done();
    });
  });

  it('should be able to deinitialise',function(done){
    AccountFactory.destroyAllAccounts().then(function(){done();});
  });

});
