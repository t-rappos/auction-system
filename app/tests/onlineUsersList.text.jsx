
var React = require('react');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var OnlineUsersListComponent = require('OnlineUsersListComponent');

describe("OnlineUsersListComponent", function(){
  //exists
  it('should exist', function(done){
    expect(OnlineUsersListComponent).toExist();
    done();
  });

  //renders with no users
  it('should render with no users',function(done){
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {[]}
        getUserListFromServer = {()=>{}}
        setCallbackForLogins= {()=>{}}
        setCallbackForLogouts= {()=>{}}
        dispatchSetUsers= {()=>{}}
        dispatchAddUser= {()=>{}}
        dispatchRemoveUser= {()=>{}} />);
    let $el = $(userList.node);
    let ul = $el.find('ul')[0];
    let count = $el.find('ul').children().length;
    expect(ul).toExist();
    expect(count).toBe(0);
    expect($el.text()).toBe('');
    done();
  });

  //renders multiple users
  it('should render multiple users',function(done){
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {['tom','andy','jim']}
        getUserListFromServer = {()=>{}}
        setCallbackForLogins= {()=>{}}
        setCallbackForLogouts= {()=>{}}
        dispatchSetUsers= {()=>{}}
        dispatchAddUser= {()=>{}}
        dispatchRemoveUser= {()=>{}} />);
    let $el = $(userList.node);
    let ul = $el.find('ul')[0];
    let count = $el.find('ul').children().length;
    expect(ul).toExist();
    expect(count).toBe(3);
    expect($el.text()).toNotBe('');
    done();
  });

  //dispatches event when a user logs in
  it('should dispatch event when user logs in',function(done){
    let serverLoginCallback;

    let getUserListFromServer = ()=>{};
    let setCallbackForLogins = (callback)=>{serverLoginCallback=callback;};
    let setCallbackForLogouts = ()=>{};
    let dispatchSetUsers= ()=>{};
    let dispatchAddUser= expect.createSpy();
    let dispatchRemoveUser= ()=>{};
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {[]}
        getUserListFromServer = {getUserListFromServer}
        setCallbackForLogins = {setCallbackForLogins}
        setCallbackForLogouts = {setCallbackForLogouts}
        dispatchSetUsers = {dispatchSetUsers}
        dispatchAddUser = {dispatchAddUser}
        dispatchRemoveUser ={dispatchRemoveUser} />);
    expect(userList).toExist();
    serverLoginCallback('tom'); //mock server
    expect(dispatchAddUser).toHaveBeenCalledWith('tom');
    done();
  });

  //dispatches event when a user logs out
  it('should dispatch an event when user logs out',function(done){
    let serverLogoutCallback;
    let getUserListFromServer = ()=>{};
    let setCallbackForLogins = ()=>{};
    let setCallbackForLogouts = (callback)=>{serverLogoutCallback=callback;};
    let dispatchSetUsers= ()=>{};
    let dispatchAddUser=()=>{};
    let dispatchRemoveUser = expect.createSpy();
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {[]}
        getUserListFromServer = {getUserListFromServer}
        setCallbackForLogins = {setCallbackForLogins}
        setCallbackForLogouts = {setCallbackForLogouts}
        dispatchSetUsers = {dispatchSetUsers}
        dispatchAddUser = {dispatchAddUser}
        dispatchRemoveUser = {dispatchRemoveUser}/>);
    expect(userList).toExist();
    serverLogoutCallback('tom'); //mock server
    expect(dispatchRemoveUser).toHaveBeenCalled();
    expect(dispatchRemoveUser).toHaveBeenCalledWith('tom');
    done();
  });

  //dispatch event after getting user list from server
  it('should dispatch event after getting user list from server',function(done){
    let getUserListFromServer = (returnFn)=>{returnFn(['tom','andy']);};
    let setCallbackForLogins =  ()=>{};
    let setCallbackForLogouts = ()=>{};
    let dispatchSetUsers= expect.createSpy();
    let dispatchAddUser=()=>{};
    let dispatchRemoveUser = ()=>{};
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {[]}
        getUserListFromServer  = {getUserListFromServer}
        setCallbackForLogins = {setCallbackForLogins}
        setCallbackForLogouts = {setCallbackForLogouts}
        dispatchSetUsers = {dispatchSetUsers}
        dispatchAddUser = {dispatchAddUser}
        dispatchRemoveUser = {dispatchRemoveUser}
        />);
    expect(userList).toExist();
    expect(dispatchSetUsers).toHaveBeenCalledWith(['tom','andy']);
    done();
  });

  //complain if users isn't an array
  describe('should complain if users isnt an array',function(){
    it('should complain if null',function(done){
      expect(()=>{
        let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent users = {null}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/users/);
          done();
    });
    it('should complain if empty quotes',function(done){
      expect(()=>{
        let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent users = {''}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/users/);
          done();
    });
    it('should complain if not specified',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/users/);
          done();
    });
  });


  //complain when callbacks arent passed
  describe('should complain when callbacks arent passed',function(){
    //getUserListFromServer
    it('should complain when it doesnt recieve getUserListFromServer',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            users = {[]}
            getUserListFromServer = {null}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/function/);
      expect(()=>{
             let userList = TestUtils.renderIntoDocument(
              <OnlineUsersListComponent
                users = {[]}
                setCallbackForLogins= {()=>{}}
                setCallbackForLogouts= {()=>{}}
                dispatchSetUsers= {()=>{}}
                dispatchAddUser= {()=>{}}
                dispatchRemoveUser= {()=>{}} />);
                expect(userList).toNotExist();
              }).toThrow(/function/);
              done();
    });

    //setCallbackForLogins
    it('should complain when it doesnt recieve setCallbackForLogins',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            users = {[]}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {null}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/function/);
          done();
    });

    //setCallbackForLogouts
    it('should complain when it doesnt recieve setCallbackForLogouts',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            users = {[]}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {null}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/function/);
          done();
    });

    //
    it('should complain when it doesnt recieve dispatchSetUsers',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            users = {[]}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {null}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/function/);
          done();
    });

    //
    it('should complain when it doesnt recieve dispatchAddUser',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            users = {[]}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {null}
            dispatchRemoveUser= {()=>{}} />);
            expect(userList).toNotExist();
          }).toThrow(/function/);
          done();
    });

    //
    it('should complain when it doesnt recieve dispatchRemoveUser',function(done){
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            users = {[]}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {null} />);
            expect(userList).toNotExist();
          }).toThrow(/function/);
        done();
    });
  });
});
