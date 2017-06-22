var React = require('react');
var expect = require('expect');
//var TestUtils = require('react-addons-test-utils');
//import {shallow} from 'enzyme';
import {mount} from 'enzyme';

var LoginForm = require('../components/loginForm.jsx');

function changeInput(value, selector, baseObj){
  let obj = baseObj.find(selector);
  obj.node.value = value;
  obj.simulate('change', obj);
}

describe("LoginForm", function(){
  //exists
  it('should exist', function(done){
    expect(LoginForm).toExist();
    done();
  });

  it('should allow login', function(done){
    let login = mount(<LoginForm/>);
    expect(login).toExist();
    changeInput('tom', 'input#username', login);
    changeInput('tom2', 'input#password', login);
    login.find('form').at(0).simulate('submit');
    expect(login.state('lastResultMessage')).toBe('valid');
    done();
  });

});