let React = require('react');
let ReactDOM = require('react-dom');
let {Route, Router, IndexRoute, hashHistory} = require('react-router');
let Main = require('Main');
//let redux = require('Redux');
//var socket = io.connect();

ReactDOM.render(
  <div>
    <h1>app.jsx Chat App!</h1>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
      </Route>
    </Router>
  </div>,
  document.getElementById('app')
);
