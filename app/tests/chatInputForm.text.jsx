var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var ChatInputFormComponent = require('ChatInputFormComponent');

function renderChatInputForm(user, sendMessageToServerCallback)
{
  return TestUtils.renderIntoDocument(<ChatInputFormComponent user={user} sendMessageToServer={sendMessageToServerCallback}/>);
}

describe("ChatInputFormComponent", ()=>{
  //exists
  it('should exist', () => {expect(ChatInputFormComponent).toExist();});

  var checkInputWorks = (input,expectedOutcome) => {
    let sendMessageFn = expect.createSpy();
    let chatInput = renderChatInputForm('tom',sendMessageFn);
    let $el = $(ReactDOM.findDOMNode(chatInput));
    chatInput.input.value = input;
    TestUtils.Simulate.submit($el.find('form')[0]);
    if (expectedOutcome){
      expect(sendMessageFn).toHaveBeenCalled();
      expect(chatInput.input.value).toBe('');
    } else {
      expect(sendMessageFn).toNotHaveBeenCalled();
    }
  };

  describe('should only send when username is specified',()=>{
    it('should fail if username is null', ()=>{
       expect(()=>{TestUtils.renderIntoDocument(<ChatInputFormComponent sendMessageToServer={()=>{}}/>);}).toThrow(/user/);
       expect(()=>{TestUtils.renderIntoDocument(<ChatInputFormComponent user='' sendMessageToServer={()=>{}}/>);}).toThrow(/user/);
       expect(()=>{TestUtils.renderIntoDocument(<ChatInputFormComponent user={null} sendMessageToServer={()=>{}}/>);}).toThrow(/user/);
     });
     it('should pass if username is specified', ()=>{
        let sendMessageFn = expect.createSpy();
        let chatInput = renderChatInputForm('tom',sendMessageFn);
        let $el = $(ReactDOM.findDOMNode(chatInput));
        chatInput.input.value = 'hello world this is my message';
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(sendMessageFn).toHaveBeenCalled();
        expect(chatInput.input.value).toBe('');
      });
  });


  describe('shouldnt send message when input is incorrect', ()=>{
    it('empty quotes',()=>{
      let sendMessageFn = expect.createSpy();
      let chatInput = renderChatInputForm('tom',sendMessageFn);
      let $el = $(ReactDOM.findDOMNode(chatInput));
      chatInput.input.value = '';
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(sendMessageFn).toNotHaveBeenCalled("called on empty quotes");
    });
    it('null',()=>{
      let sendMessageFn = expect.createSpy();
      let chatInput = renderChatInputForm('tom',sendMessageFn);
      let $el = $(ReactDOM.findDOMNode(chatInput));
      chatInput.input.value = null;
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(sendMessageFn).toNotHaveBeenCalled("called on null");
    });
    it('undefined',()=>{
      let sendMessageFn = expect.createSpy();
      let chatInput = renderChatInputForm('tom',sendMessageFn);
      let $el = $(ReactDOM.findDOMNode(chatInput));
      delete chatInput.input.value;
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(sendMessageFn).toNotHaveBeenCalled("called on unspecified");
    });
  });

  it('should render', ()=>{
    let chatInput = renderChatInputForm('tom',()=>{});
    let $el = $(ReactDOM.findDOMNode(chatInput));
    let input = $el.find('input')[0];
    expect(input).toExist();
  });

  it('should complain when no user is sent as prop', ()=>{
    expect(()=>{
      renderChatInputForm(null,()=>{});
    }).toThrow(/user/);
  });

  it('should complain when no makeMessage callback is sent as prop', ()=>{
    expect(()=>{
      renderChatInputForm('tom',null);
    }).toThrow(/function/);
  });

});
