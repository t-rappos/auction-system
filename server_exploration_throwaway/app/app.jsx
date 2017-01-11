var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var Main = require('Main');
var TabLogin = require('TabLogin');
var TabView = require('TabView');

var redux = require('Redux');

ReactDOM.render(
  <div>
    <h1>app.jsx server exploration App!</h1>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="tabview" component={TabView}/>
        <IndexRoute component={TabLogin}/>
      </Route>
    </Router>
  </div>,
  document.getElementById('app')
);
