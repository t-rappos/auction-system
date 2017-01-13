let React = require('react');
let ReactDOM = require('react-dom');
let {Route, Router, IndexRoute, hashHistory} = require('react-router');

let Main = require('Main');
let TabLogin = require('TabLogin');
let TabView = require('TabView');

let redux = require('Redux');

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
