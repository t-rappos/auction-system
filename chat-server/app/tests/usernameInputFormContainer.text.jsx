var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var UsernameInputFormContainer = require('UsernameInputFormContainer');
var ServerApi = require('ServerAPI');

//This file tests the state+behaviour of the usernameInputForm


describe("UsernameInputFormContainer", function(){
  //exists
  it('should exist', function(done){
    expect(UsernameInputFormContainer).toExist();
    expect(React).toExist();
    expect(expect).toExist();
    expect($).toExist();
    expect(TestUtils).toExist();
    expect(ServerApi).toExist();
    done();
  });

/*
<UsernameInputFormContainer
sendLoginRequestToServer =/>
*/

/*
  it('should exists with no input',()=>{
    let ui = TestUtils.renderIntoDocument(
      <UsernameInputFormContainer
         sendLoginRequestToServer={ServerApi.sendUserLoginRequest}/>);
    let $el = $(ui.node);
    let input = $el.find('input')[0];
    expect(input).toExist();
  });

  it('should accept name',(done)=>{
    let ui = TestUtils.renderIntoDocument(
      <UsernameInputFormContainer
         sendLoginRequestToServer={ServerApi.sendUserLoginRequest}/>);
    let $el = $(ui.node);
    let input = $el.find('input')[0];
    ui.input.value = 'tom';
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(input).toExist();
    setTimeout(()=>{
      expect(ui.props.user).toBe('tom');
      done();
    },2000);
  });

  it('shouldnt accept incorrect name',()=>{

  });

  it('shouldnt accept same name',()=>{

  });

  it('shouldnt accept name when a name is already accepted/set',()=>{

  });
*/
});
