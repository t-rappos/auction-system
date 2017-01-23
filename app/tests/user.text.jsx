var React = require('react');
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
          expect(user).toNotExist();
        }).toThrow(/Username/);
      expect(()=>{
          let user = TestUtils.renderIntoDocument(<UserComponent username=''/>);
          expect(user).toNotExist();
        }).toThrow(/Username/);
    });

    //'should render properly'
    it('should render properly',()=>{
      let user = TestUtils.renderIntoDocument(<UserComponent username='tom'/>);
      var $el = $(user.node);
      expect($el).toNotBe(null,$el);
      var actual = $el.text();
      var expected = "tom";
      expect(actual).toBe(expected, actual);
    });
});