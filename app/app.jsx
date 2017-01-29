let React = require('react');
let ReactDOM = require('react-dom');
let {Route, Router, hashHistory} = require('react-router');
let Main = require('Main');
import {Provider} from 'react-redux';
let redux = require('ReduxWrapper');
var $ = require('jquery');

var store = redux.createStore();

//load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

ReactDOM.render(
  <div>
    <Provider store = {store}>
      <div>
      <div className = 'top-bar'>
        <div className = 'top-bar-left'>
          <ul className="dropdown menu" data-dropdown-menu>
            <div className ="menu-text">Chat-Server App!</div>
          </ul>
        </div>
        <div className = 'top-bar-right'>
          <ul className="menu">
            <li>By Thomas Rappos </li>
            <li><a href="https://github.com/t-rappos/auction-system/blob/master/doc/chat-server.md">See Github</a></li>
          </ul>
        </div>
      </div>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
        </Route>
      </Router>
      </div>
    </Provider>
  </div>,
  document.getElementById('app')
);
