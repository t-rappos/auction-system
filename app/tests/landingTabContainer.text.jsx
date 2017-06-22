var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');
//import {shallow} from 'enzyme';
import {mount} from 'enzyme';

var LandingTabContainer = require('../components/landingTabContainer.jsx');

function renderLoginComponent(){
  return TestUtils.renderIntoDocument(<LandingTabContainer/>);
}

describe("LandingTabContainer", function(){
  //exists
  it('should exist', function(done){
    expect(LandingTabContainer).toExist();
    done();
  });
  it('should find buttons', function(done){
    let login = renderLoginComponent();
    let $el = $(login.node);
    let tl = $el.find('#loginTab')[0];
    let tr = $el.find('#registerTab')[0];
    expect(login).toExist();
    expect(tl).toExist();
    expect(tr).toExist();
    done();
  });
  it('should have login form as default',function(done){
    let login = renderLoginComponent();
    expect(login).toExist();
    let $el = $(login.node);
    let loginForm= $el.find("#loginForm")[0];
    let registerForm = $el.find("#registerForm")[0];
    expect(loginForm).toExist();
    expect(registerForm).toNotExist();
    //TODO: Simulate clicking on tab
    done();
  });
  it('should be able to toggle', function(done){
    let login = mount(<LandingTabContainer/>);
    expect(login.find('LoginForm').length).toBe(1);
    expect(login.find('RegisterForm').length).toBe(0);
    login.find('button#registerTab').at(0).simulate('click');
    expect(login.find('LoginForm').length).toBe(0);
    expect(login.find('RegisterForm').length).toBe(1);
    done();
  });
});