
var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var MessageComponent = require('MessageComponent');

describe('Message', function(){
  it('should exist', function(done){
    expect(MessageComponent).toExist();
    done();
  });

  it('should fail scoped date',function(done){
    expect(function(){
      let date = Date(2000,1,2,3,4,5,0);
      let msg = TestUtils.renderIntoDocument(
            <MessageComponent author='tom' content='msg' date={date}/>);
              expect(typeof(msg.getDate())).toNotBe('object');
    }).toThrow(/Date/);
    done();
  });

  it('should complain about not having date', function(done){
    expect(()=>{
        let msg = TestUtils.renderIntoDocument(
          <MessageComponent author='tom' content='msg'/>);
        expect(msg).toNotExist();
      }).toThrow(/Date/);
      done();
  });

  it('should complain about not having author',function(done){
    let date = Date(2000,1,2,3,4,5,0);
    expect(function () {
      let m = TestUtils.renderIntoDocument(
        <MessageComponent content='msg' date={date}/>);
      expect(m).toNotExist();
    }).toThrow(/Author/);

    expect(function () {
      let m = TestUtils.renderIntoDocument(
        <MessageComponent author='' content='msg' date={date}/>);
      expect(m).toNotExist();
    }).toThrow(/Author/);
    done();
  });

  it('should complain about not having message content',function(done){
    let date = Date(2000,1,2,3,4,5,0);
    expect(()=>{
      TestUtils.renderIntoDocument(
          <MessageComponent author='tom' date={date}/>);
      }).toThrow(/Message/);

    expect(()=>{
      TestUtils.renderIntoDocument(
          <MessageComponent content = '' author='tom' date={date}/>);
      }).toThrow(/Message/);
      done();
  });

  //it('should complain about not having date',()=>{
  //  var testMessage = TestUtils.renderIntoDocument(
  //    <MessageComponent author='tom' content='msg' />);
  //});

  var date = new Date(2000,1,2,3,4,5,0);
  var testMessage = TestUtils.renderIntoDocument(
    <MessageComponent author='tom' content='msg' date={date}/>);

  it('should have date',function(done){
    expect(testMessage.getDate()).toBe(date);
    expect(typeof(testMessage.getDate())).toBe('object');
    done();
  });

  it('should format date', function(done){
    var expected = '3:04:05 AM'; //h:MM:ss TT");
    var actual = testMessage.formatDate(date);
    expect(actual).toBe(expected);
    done();
  });

  it('should format message',function(done){
    var expected = "[3:04:05 AM] tom : msg";
    var actual = testMessage.formatMessage();
    expect(actual).toBe(expected);
    done();
  });

  it('should render message to output',function(done){
    var $el = $(testMessage.node);
    expect($el).toNotBe(null,$el);
    var actual = $el.text();
    var expected = "[3:04:05 AM] tom : msg";
    expect(actual).toBe(expected, actual);
    done();
  });


});
