var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var ChatInputFormComponent = require('ChatInputFormComponent');

function renderChatInputForm(user, sendMessageToServerCallback)
{
  return TestUtils.renderIntoDocument(<ChatInputFormComponent user={user} sendMessageToServer={sendMessageToServerCallback}/>);
}

describe("ChatInputFormComponent", function(){
  //exists
  it('should exist', function(done){
    expect(ChatInputFormComponent).toExist();
    done();
  });

  it('should render without username', function(done){
    var chatInput = TestUtils.renderIntoDocument(
      <ChatInputFormComponent sendMessageToServer={()=>{}}/>);
    let $el = $(chatInput.node);
    let input = $el.find('input')[0];
    expect(input).toExist();
    done();
  });


  describe('should only send when username is specified',function(){
    describe('should fail if username is null', function(){
      it('should fail with no input',function(done){
         let sendMessageFn = expect.createSpy();
         let chatInput = TestUtils.renderIntoDocument(<ChatInputFormComponent sendMessageToServer={sendMessageFn}/>);
         let $el = $(chatInput.node);
         chatInput.input.value = 'hello world this is my message';
         TestUtils.Simulate.submit($el.find('form')[0]);
         expect(sendMessageFn).toNotHaveBeenCalled();
         done();
       });
       it('should fail with empty quotes',function(done){
         let sendMessageFn = expect.createSpy();
         let chatInput = TestUtils.renderIntoDocument(<ChatInputFormComponent user='' sendMessageToServer={sendMessageFn}/>);
         let $el = $(chatInput.node);
         chatInput.input.value = 'hello world this is my message';
         TestUtils.Simulate.submit($el.find('form')[0]);
         expect(sendMessageFn).toNotHaveBeenCalled();
         done();
         });
      it('should fail with null',function(done){
         let sendMessageFn = expect.createSpy();
         let chatInput = TestUtils.renderIntoDocument(<ChatInputFormComponent user={null} sendMessageToServer={sendMessageFn}/>);
         let $el = $(chatInput.node);
         chatInput.input.value = 'hello world this is my message';
         TestUtils.Simulate.submit($el.find('form')[0]);
         expect(sendMessageFn).toNotHaveBeenCalled();
         done();
       });
     });
     it('should pass if username is specified', function(done){
        let sendMessageFn = expect.createSpy();
        let chatInput = renderChatInputForm('tom',sendMessageFn);
        let $el = $(chatInput.node);
        chatInput.input.value = 'hello world this is my message';
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(sendMessageFn).toHaveBeenCalled();
        expect(chatInput.input.value).toBe('');
        done();
      });
  });

  describe('should not send message when input is incorrect', function(){
    it('should fail with empty quotes',function(done){
      let sendMessageFn = expect.createSpy();
      let chatInput = renderChatInputForm('tom',sendMessageFn);
      let $el = $(chatInput.node);
      chatInput.input.value = '';
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(sendMessageFn).toNotHaveBeenCalled();
      done();
    });

    it('should fail with null',function(done){
      let sendMessageFn = expect.createSpy();
      let chatInput = renderChatInputForm('tom',sendMessageFn);
      let $el = $(chatInput.node);
      chatInput.input.value = null;
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(sendMessageFn).toNotHaveBeenCalled();
      done();

    });
    it('should fail with undefined',function(done){
      let sendMessageFn = expect.createSpy();
      let chatInput = renderChatInputForm('tom',sendMessageFn);
      let $el = $(chatInput.node);
      delete chatInput.input.value;
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(sendMessageFn).toNotHaveBeenCalled();
      done();
    });
  });

  it('should render',function(done){
    let chatInput = renderChatInputForm('tom',()=>{});
    let $el = $(chatInput.node);
    let input = $el.find('input')[0];
    expect(input).toExist();
    done();
  });

  it('should complain when no makeMessage callback is sent as prop', function(done){
    expect(()=>{
      renderChatInputForm('tom',null);
    }).toThrow(/function/);
    done();
  });

});
