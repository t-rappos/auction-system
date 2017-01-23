var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var UsernameInputFormComponent = require('UsernameInputFormComponent');


describe("UsernameInputFormComponent", ()=>{
  //exists
  it('should exist', () => {expect(UsernameInputFormComponent).toExist();});

  //renders with no input
  it('should render without username', () => {
    var usernameInput = TestUtils.renderIntoDocument(
      <UsernameInputFormComponent
        dispatchSetCurrentUser={()=>{}}
         sendLoginRequestToServer=  {()=>{}} />);
    let $el = $(usernameInput.node);
    let input = $el.find('input')[0];
    expect(input).toExist();
  });

  //doesnt send incorrect username
  describe('shouldnt send incorrent username',()=>{
    //null
    it('null', ()=>{
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
    });
    //undefined
    it('undefined', ()=>{
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
    });
    //non-alphanumeric
    it('non-alphanumeric', ()=>{
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
    });
  });


  //doesnt send if username is chosen
  it('shouldnt send if username is chosen already', ()=>{
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
  });

  //sends correct username
  it('should send if input is correct', ()=>{
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
  });

  //complain when props not sent
  describe('should complain if callbacks arent set',()=>{
    //dispatchSetCurrentUser
    it('dispatchSetCurrentUser', ()=>{
      expect(()=>{
        TestUtils.renderIntoDocument(
          <UsernameInputFormComponent
             sendLoginRequestToServer=  {()=>{}} />);
      }).toThrow(/function/);
    });
    //sendLoginRequestToServer
    it('sendLoginRequestToServer', ()=>{
      expect(()=>{
        TestUtils.renderIntoDocument(
          <UsernameInputFormComponent
            dispatchSetCurrentUser={()=>{}} />);
      }).toThrow(/function/);
    });
  });
});
