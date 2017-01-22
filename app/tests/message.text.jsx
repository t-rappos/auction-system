var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var MessageComponent = require('MessageComponent');

describe('Message', () => {
  it('should exist', () => {expect(MessageComponent).toExist();});

  it('should fail scoped date', () => {
    expect(()=>{
      let date = Date(2000,1,2,3,4,5,0);
      let msg = TestUtils.renderIntoDocument(
            <MessageComponent author='tom' content='msg' date={date}/>);
              expect(typeof(msg.getDate())).toNotBe('object');
    }).toThrow(/Date/);
  });

  it('should complain about not having date', () => {
    expect(()=>{
        let msg = TestUtils.renderIntoDocument(
          <MessageComponent author='tom' content='msg'/>);
      }).toThrow(/Date/);
  });

  it('should complain about not having author',()=>{
    let date = Date(2000,1,2,3,4,5,0);
    expect(function () {
      let m = TestUtils.renderIntoDocument(
        <MessageComponent content='msg' date={date}/>);
    }).toThrow(/Author/);

    expect(function () {
      let m = TestUtils.renderIntoDocument(
        <MessageComponent author='' content='msg' date={date}/>);
    }).toThrow(/Author/);
  });

  it('should complain about not having message content',()=>{
    let date = Date(2000,1,2,3,4,5,0);
    expect(()=>{
      TestUtils.renderIntoDocument(
          <MessageComponent author='tom' date={date}/>);
      }).toThrow(/Message/);

      expect(()=>{
        TestUtils.renderIntoDocument(
            <MessageComponent content = '' author='tom' date={date}/>);
        }).toThrow(/Message/);
  });

  //it('should complain about not having date',()=>{
  //  var testMessage = TestUtils.renderIntoDocument(
  //    <MessageComponent author='tom' content='msg' />);
  //});

  var date = new Date(2000,1,2,3,4,5,0);
  var testMessage = TestUtils.renderIntoDocument(
    <MessageComponent author='tom' content='msg' date={date}/>);

  it('should have date',() => {
    expect(testMessage.getDate()).toBe(date);
    expect(typeof(testMessage.getDate())).toBe('object');
  })

  it('should format date', () => {
    var expected = '3:04:05 AM'; //h:MM:ss TT");
    var actual = testMessage.formatDate(date);
    expect(actual).toBe(expected);
  });

  it('should format message', ()=>{
    var expected = "[3:04:05 AM] tom : msg";
    var actual = testMessage.formatMessage();
    expect(actual).toBe(expected);
  });

  it('should render message to output',()=>{
    var $el = $(ReactDOM.findDOMNode(testMessage));
    expect($el).toNotBe(null,$el);
    var actual = $el.text();
    var expected = "[3:04:05 AM] tom : msg";
    expect(actual).toBe(expected, actual);
  });


});
