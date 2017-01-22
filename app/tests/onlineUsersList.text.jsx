var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var OnlineUsersListComponent = require('OnlineUsersListComponent');

describe("OnlineUsersListComponent", ()=>{
  //exists
  it('should exist', () => {expect(OnlineUsersListComponent).toExist();});

  //renders with no users
  it('should render with no users',()=>{
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {[]}
        getUserListFromServer = {()=>{}}
        setCallbackForLogins= {()=>{}}
        setCallbackForLogouts= {()=>{}}
        dispatchSetUsers= {()=>{}}
        dispatchAddUser= {()=>{}}
        dispatchRemoveUser= {()=>{}} />);
    let $el = $(ReactDOM.findDOMNode(userList));
    let ul = $el.find('ul')[0];
    let count = $el.find('ul').children().length;
    expect(ul).toExist();
    expect(count).toBe(0);
    expect($el.text()).toBe('');
  });

  //renders multiple users
  it('should render multiple users',()=>{
    let userList = TestUtils.renderIntoDocument(
      <OnlineUsersListComponent users = {['tom','andy','jim']}
        getUserListFromServer = {()=>{}}
        setCallbackForLogins= {()=>{}}
        setCallbackForLogouts= {()=>{}}
        dispatchSetUsers= {()=>{}}
        dispatchAddUser= {()=>{}}
        dispatchRemoveUser= {()=>{}} />);
    let $el = $(ReactDOM.findDOMNode(userList));
    let ul = $el.find('ul')[0];
    let count = $el.find('ul').children().length;
    expect(ul).toExist();
    expect(count).toBe(3);
    expect($el.text()).toNotBe('');
  });

  //dispatches event when a user logs in
  it('should dispatch event when user logs in',()=>{
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
    serverLoginCallback('tom'); //mock server
    expect(dispatchAddUser).toHaveBeenCalledWith('tom');
  });

  //dispatches event when a user logs out
  it('should dispatch an event when user logs out',()=>{
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
    serverLogoutCallback('tom'); //mock server
    expect(dispatchRemoveUser).toHaveBeenCalled();
    expect(dispatchRemoveUser).toHaveBeenCalledWith('tom');
  });

  //dispatch event after getting user list from server
  it('should dispatch event after getting user list from server',()=>{
    let getUserListFromServer = (returnFn)=>{returnFn(['tom','andy'])};
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
    expect(dispatchSetUsers).toHaveBeenCalledWith(['tom','andy']);
  });

  //complain if users isn't an array
  describe('should complain if users isnt an array',()=>{
    it('null',()=>{
      expect(()=>{
        let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent users = {null}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
          }).toThrow(/users/);
    });
    it('empty quotes',()=>{
      expect(()=>{
        let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent users = {''}
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
          }).toThrow(/users/);
    });
    it('not specified',()=>{
      expect(()=>{
         let userList = TestUtils.renderIntoDocument(
          <OnlineUsersListComponent
            getUserListFromServer = {()=>{}}
            setCallbackForLogins= {()=>{}}
            setCallbackForLogouts= {()=>{}}
            dispatchSetUsers= {()=>{}}
            dispatchAddUser= {()=>{}}
            dispatchRemoveUser= {()=>{}} />);
          }).toThrow(/users/);
    });
  });


  //complain when callbacks arent passed
  describe('should complain when callbacks arent passed',()=>{
    //getUserListFromServer
    it('getUserListFromServer',()=>{
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
              }).toThrow(/function/);
    });

    //setCallbackForLogins
    it('setCallbackForLogins',()=>{
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
          }).toThrow(/function/);
    });

    //setCallbackForLogouts
    it('setCallbackForLogouts',()=>{
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
          }).toThrow(/function/);
    });

    //
    it('dispatchSetUsers',()=>{
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
          }).toThrow(/function/);
    });

    //
    it('dispatchAddUser',()=>{
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
          }).toThrow(/function/);
    });

    //
    it('dispatchRemoveUser',()=>{
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
          }).toThrow(/function/);
    });
  });
});
