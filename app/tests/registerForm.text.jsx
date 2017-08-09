var React = require('react');
var expect = require('expect');
//var TestUtils = require('react-addons-test-utils');
//import {shallow} from 'enzyme';
import {mount} from 'enzyme';

var RegisterForm = require('../components/registerForm.jsx');

function changeInput(value, selector, baseObj){
  let obj = baseObj.find(selector);
  obj.node.value = value;
  obj.simulate('change', obj);
}

describe("RegisterForm", function(){
  //exists
  it('should exist', function(done){
    expect(RegisterForm).toExist();
    done();
  });

  it('should allow registration', function(done){
    let register = mount(<RegisterForm/>);
    expect(register).toExist();
    changeInput('tom', 'input#username', register);
    //changeInput('tom@tom.com', 'input#email', register);
    //changeInput('tom2', 'input#password1', register);
    //changeInput('tom2', 'input#password2', register);
    register.find('form').at(0).simulate('submit');
    expect(register.find('input#username').get(0).value).toBe('tom');
    //expect(register.find('input#email').get(0).value).toBe('tom@tom.com');
    //expect(register.find('input#password1').get(0).value).toBe('tom2');
    //expect(register.find('input#password2').get(0).value).toBe('tom2');

    expect(register.state('lastResultMessage')).toBe('valid');
    done();
    
    //TODO: how do we know it the result from server was successful?
    //we probably don't care... 
  });

});