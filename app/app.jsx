let React = require('react');
let ReactDOM = require('react-dom');
let {Route, Router, browserHistory} = require('react-router');
let LoginContainer = require('./components/loginContainer.jsx');
let Header = require('./components/header.jsx');
let PageContainer = require('./components/pageContainer.jsx');
import {Provider} from 'react-redux';
let redux = require('./redux/wrapper.jsx');
var $ = require('jquery');
let ToastContainer = require('./components/toast/toastContainer.jsx');
var store = redux.store;

//load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

//const pageRoute = ({component : Component})=>(
//  <Route {}
//)

//render = {(props)=>(<Page><Main/></Page>)}

ReactDOM.render(
    <Provider store = {store}>
      <div>
        <Header/>
        <Router history={browserHistory}>
          <Route path="/" component = {LoginContainer} mode = 'login'></Route>
          <Route path="/account" component={PageContainer}></Route>
          <Route path="/register" component={LoginContainer} mode = 'register'></Route>
        </Router>
        <ToastContainer/>
      </div>
    </Provider>
,
  document.getElementById('app')
);
