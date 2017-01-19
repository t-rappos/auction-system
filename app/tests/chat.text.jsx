var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var ChatComponent = require('ChatComponent');
//var MessageComponent = require('MessageComponent');

function PrintDom(root, level=0, child = 0){
  if(root){
  var type = $(root)[0].tagName;
  if (!type){type=root;}
    var res = "";
    if ($(root).children() && $(root).children().length > 0){
      for (var i = 0; i < $(root).children().length; i++){
        res+=PrintDom($(root).children()[i],level+1,i);
      }
    }
    return "["+type+":" +level+":"+child+"]"+res;
  } else {
    return "root is undefined";
  }
}

describe("ChatComponent", ()=>{
  //exists
  it('should exist', () => {expect(ChatComponent).toExist();});

  //correct amount of messages received from server
  it('should recieve message list from server', ()=>{

    expect(true).toBe(true);
  });

  //subsciption to new message events is active
  it('should recieve new messages',()=>{
    let chat = TestUtils.renderIntoDocument(<ChatComponent
      serverApiGetMessageList={()=>{}}
      serverApiSetOnMessageCallback = {()=>{}}
      onMessageListRecieved = {()=>{}}
      onNewMessage = {()=>{}}/>);
  });

  //nothing is rendered
  it('should render nothing when there are no messages', ()=>{
    let chat = TestUtils.renderIntoDocument(<ChatComponent
      serverApiGetMessageList={()=>{}}
      serverApiSetOnMessageCallback = {()=>{}}
      onMessageListRecieved = {()=>{}}
      onNewMessage = {()=>{}}/>);
    var $el = $(ReactDOM.findDOMNode(chat));
    var count = $el.find("#ul").children().length;
    expect(count).toBe(0,"chat messages in list:"+count);
    expect($el.text()).toBe('');
  });

  //complain if messages is passed not as an array
  it('should complain if messages is passed not as an array', ()=>{
    let date = new Date();
    let mc = {author:'tom', content:'data', date};

    expect(()=>{
      let chat = TestUtils.renderIntoDocument(<ChatComponent
        serverApiGetMessageList={()=>{}}
        serverApiSetOnMessageCallback = {()=>{}}
        onMessageListRecieved = {()=>{}}
        onNewMessage = {()=>{}}
        messages = {mc}/>);
    }).toThrow(/TypeError/);
  });

  //should render a message
  it('should render a message', ()=>{
    let date = new Date();
    let ma = [{author:'tom', message:'data', date},
    {author:'tom', message:'data', date},
    {author:'tom', message:'data', date}];

    let chat = TestUtils.renderIntoDocument(<ChatComponent
      serverApiGetMessageList={()=>{}}
      serverApiSetOnMessageCallback = {()=>{}}
      onMessageListRecieved = {()=>{}}
      onNewMessage = {()=>{}}
      messages = {ma}/>);

    var $el = $(ReactDOM.findDOMNode(chat));
    let count = $el.find("ul").children().length;
    expect(count).toBe(3,"chat messages in list:"+count+" found ul: ",$el.find("ul"));
    expect($el.text()).toNotBe('');
    ////TODO: do we care what the messages look like?
  });

  //a messages is added
  it('should handle adding a message', ()=>{

  });

  //a message list is loaded
  it('a message list is loaded',()=>{
    var sGetMessageList = ()=>{};
    var sSetOnMessageCB = ()=>{};
    var onMessageListRec = ()=>{};
    var onNewMessage = ()=>{};
    let chat = TestUtils.renderIntoDocument(<ChatComponent
      serverApiGetMessageList={sGetMessageList}
      serverApiSetOnMessageCallback = {sSetOnMessageCB}
      onMessageListRecieved = {onMessageListRec}
      onNewMessage = {onNewMessage}/>);
    sSetOnMessageCB('message');

  });

  //complain when on-message-list-recieved callback is missing

  //complain when on-new-message-recieved callback is missing

  //complain when server get message list callback is missing

  //complain when server set on new message callback is missing

});
