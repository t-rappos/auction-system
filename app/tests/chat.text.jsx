
var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var ChatComponent = require('ChatComponent');

//NOTE: This component doesn't alter its own state per-se
// therefor we don't test for changes to state. E.g. adding new messages,
// loading message lists. This functionality will be tested in ChatContainer


function renderChatComponent(a,b,c,d,msgs=[]){
  return TestUtils.renderIntoDocument(<ChatComponent
    getMessageListFromServer={a}
    setCallbackForNewMessages = {b}
    dispatchSetMessageList = {c}
    dispatchAddMessage = {d}
    messages = {msgs}/>);
}

describe("ChatComponent", function(){
  //exists
  it('should exist', function(done){
    expect(ChatComponent).toExist();
    done();
  });

  //nothing is rendered
  it('should render nothing when there are no messages', function(done){
    let chat = renderChatComponent(()=>{},()=>{},()=>{},()=>{});
    var $el = $(chat.node);
    var count = $el.find("#ul").children().length;
    expect(count).toBe(0,"chat messages in list:"+count);
    expect($el.text()).toBe('');
    done();
  });

  //complain if messages is passed not as an array
  it('should complain if messages is passed not as an array', function(done){
    let date = new Date();
    let mc = {author:'tom', content:'data', date};

    expect(()=>{
      let chat = renderChatComponent(()=>{},()=>{},()=>{},()=>{},mc);
      expect(chat).toNotExists();
    }).toThrow(/TypeError/);
    done();
  });

  //should render a message
  it('should render a message',function(done){
    let date = new Date();
    let ma = [{author:'tom', message:'data', date},
    {author:'tom', message:'data', date},
    {author:'tom', message:'data', date}];

    let chat = renderChatComponent(()=>{},()=>{},()=>{},()=>{},ma);

    var $el = $(chat.node);
    let count = $el.find("ul").children().length;
    expect(count).toBe(3,"chat messages in list:"+count+" found ul: ",$el.find("ul"));
    expect($el.text()).toNotBe('');
    done();
    ////TODO: do we care what the messages look like?
  });


  //a message list is loaded
  it('should load a message list',function(done){

    let cb;
    var msg = {author:'tom', message:'msg', date: new Date()};
    var messagelist = [{author:'tom', message:'msg', date: new Date()},
                      {author:'tom', message:'msg', date: new Date()}];

    var getMessageListFromServer = (callback)=>{callback(messagelist);};  //this should return message list};
    var setCallbackForNewMessages = (callback)=>{cb = callback;}; //this should set some other function
                                            //up to call this function when a new message arrives};
    var dispatchSetMessageList = expect.createSpy();    //this should be called when after the messagelist is recieved
    var dispatchAddMessage = expect.createSpy();        //this should be called when a message is sent from server
    var chat = renderChatComponent(getMessageListFromServer,
                                  setCallbackForNewMessages,
                                  dispatchSetMessageList,
                                  dispatchAddMessage);
    expect(chat).toExist();
    expect(dispatchSetMessageList).toHaveBeenCalled();
    cb(msg);
    expect(dispatchAddMessage).toHaveBeenCalled();
    done();

  });

  //complain when on-message-list-recieved callback is missing
  it('should complain when getMessageListFromServer callback is missing',function(done){
      expect(()=>{renderChatComponent(null,()=>{},()=>{},()=>{});}).toThrow(/function/);
      done();
  });

  //complain when on-new-message-recieved callback is missing
  it('should complain when setCallbackForNewMessages callback is missing',function(done){
      expect(()=>{renderChatComponent(()=>{},null,()=>{},()=>{});}).toThrow(/function/);
      done();
  });

  //complain when server get message list callback is missing
  it('should complain when dispatchSetMessageList is missing',function(done){
      expect(()=>{renderChatComponent(()=>{},()=>{},null,()=>{});}).toThrow(/function/);
      done();
  });

  //complain when server set on new message callback is missing
  it('should complain when dispatchAddMessage callback is missing',function(done){
      expect(()=>{renderChatComponent(()=>{},()=>{},()=>{},null);}).toThrow(/function/);
      done();
  });

});
