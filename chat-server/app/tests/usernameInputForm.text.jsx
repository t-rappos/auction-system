var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var UsernameInputFormComponent = require('UsernameInputFormComponent');


describe("UsernameInputFormComponent", function(){
  //exists
  it('should exist', function(done){
    expect(UsernameInputFormComponent).toExist();
    done();
  });

  //renders with no input
  it('should render without username', function(done){
    var usernameInput = TestUtils.renderIntoDocument(
      <UsernameInputFormComponent
        dispatchSetCurrentUser={()=>{}}
         sendLoginRequestToServer=  {()=>{}} />);
    let $el = $(usernameInput.node);
    let input = $el.find('input')[0];
    expect(input).toExist();
    done();
  });

  //doesnt send incorrect username
  describe('should not send incorrent username',function(){
    //null
    it('should not send when null', function(done){
      let dispatchSetCurrentUser = expect.createSpy();
      let sendMessageToServer = (username, succFn) => {succFn(true);};
      var usernameInput = TestUtils.renderIntoDocument(
        <UsernameInputFormComponent
          dispatchSetCurrentUser={dispatchSetCurrentUser}
           sendLoginRequestToServer=  {sendMessageToServer} />);
      let $el = $(usernameInput.node);
      usernameInput.input.value = '';
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(dispatchSetCurrentUser).toNotHaveBeenCalled();
      done();
    });
    //undefined
    it('should not send when undefined', function(done){
      let dispatchSetCurrentUser = expect.createSpy();
      let sendMessageToServer = (username, succFn) => {succFn(true);};
      var usernameInput = TestUtils.renderIntoDocument(
        <UsernameInputFormComponent
          dispatchSetCurrentUser={dispatchSetCurrentUser}
           sendLoginRequestToServer=  {sendMessageToServer} />);
      let $el = $(usernameInput.node);
      delete usernameInput.input.value;
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(dispatchSetCurrentUser).toNotHaveBeenCalled();
      done();
    });
    //non-alphanumeric
    it('should not send when non-alphanumeric',function(done){
      let dispatchSetCurrentUser = expect.createSpy();
      let sendMessageToServer = (username, succFn) => {succFn(true);};
      var usernameInput = TestUtils.renderIntoDocument(
        <UsernameInputFormComponent
          dispatchSetCurrentUser={dispatchSetCurrentUser}
           sendLoginRequestToServer=  {sendMessageToServer} />);
      let $el = $(usernameInput.node);
      usernameInput.input.value = 't@#@12342134~~23#$#%^(#"".,)';
      TestUtils.Simulate.submit($el.find('form')[0]);
      expect(dispatchSetCurrentUser).toNotHaveBeenCalled();
      done();
    });
  });


  //doesnt send if username is chosen
  it('should not send if username is chosen already', function(done){
    let dispatchSetCurrentUser = expect.createSpy();
    let sendMessageToServer = (username, succFn) => {succFn(true);};
    var usernameInput = TestUtils.renderIntoDocument(
      <UsernameInputFormComponent
        user = 'andy'
        dispatchSetCurrentUser={dispatchSetCurrentUser}
         sendLoginRequestToServer=  {sendMessageToServer} />);
    let $el = $(usernameInput.node);
    usernameInput.input.value = 'tom';
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(dispatchSetCurrentUser).toHaveBeenCalledWith('tom');
    done();
  });

  //sends correct username
  it('should send if input is correct', function(done){
    let dispatchSetCurrentUser = expect.createSpy();
    let sendMessageToServer = (username, succFn) => {succFn(true);};
    var usernameInput = TestUtils.renderIntoDocument(
      <UsernameInputFormComponent
        dispatchSetCurrentUser={dispatchSetCurrentUser}
         sendLoginRequestToServer=  {sendMessageToServer} />);
    let $el = $(usernameInput.node);
    usernameInput.input.value = 'tom';
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(dispatchSetCurrentUser).toHaveBeenCalledWith('tom');
    done();
  });

  //complain when props not sent
  describe('should complain if callbacks arent set',function(){
    //dispatchSetCurrentUser
    it('should complain if callback not set : dispatchSetCurrentUser', function(done){
      expect(()=>{
        TestUtils.renderIntoDocument(
          <UsernameInputFormComponent
             sendLoginRequestToServer=  {()=>{}} />);
      }).toThrow(/function/);
      done();
    });
    //sendLoginRequestToServer
    it('should complain if callback not set : sendLoginRequestToServer', function(done){
      expect(()=>{
        TestUtils.renderIntoDocument(
          <UsernameInputFormComponent
            dispatchSetCurrentUser={()=>{}} />);
      }).toThrow(/function/);
      done();
    });
  });
});
