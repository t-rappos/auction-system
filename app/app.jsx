let React = require('react');
let ReactDOM = require('react-dom');
let {Route, Router, browserHistory} = require('react-router');
let LoginContainer = require('./components/loginContainer.jsx');
let Header = require('./components/header.jsx');
let PageContainer = require('./components/pageContainer.jsx');
import {Provider} from 'react-redux';
let redux = require('./reduxWrapper.jsx');
var $ = require('jquery');

var store = redux.createStore();

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
          <Route path="/" component = {LoginContainer}></Route>
          <Route path="/account" component={PageContainer}></Route>
        </Router>
      </div>
    </Provider>
,
  document.getElementById('app')
);
