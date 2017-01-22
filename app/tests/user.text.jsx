var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var UserComponent = require('UserComponent');

describe('UserComponent',()=>{
    it('should exist', () => {expect(UserComponent).toExist();});

    //should throw error when no username is given
    it('should throw error when no username is given', () => {
      expect(()=>{
          let user = TestUtils.renderIntoDocument(<UserComponent/>);
        }).toThrow(/Username/);
      expect(()=>{
          let user = TestUtils.renderIntoDocument(<UserComponent username=''/>);
        }).toThrow(/Username/);
    });

    //'should render properly'
    it('should render properly',()=>{
      let user = TestUtils.renderIntoDocument(<UserComponent username='tom'/>);
      var $el = $(ReactDOM.findDOMNode(user));
      expect($el).toNotBe(null,$el);
      var actual = $el.text();
      var expected = "tom";
      expect(actual).toBe(expected, actual);
    });
});
