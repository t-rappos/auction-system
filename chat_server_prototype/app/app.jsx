let React = require('react');
let ReactDOM = require('react-dom');
let {Route, Router, IndexRoute, hashHistory} = require('react-router');
let Main = require('Main');
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {combinedReducers} from 'Redux';

var store = createStore(combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <div>
    <Provider store = {store}>
      <div>
      <h1>app.jsx Chat App!</h1>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
        </Route>
      </Router>
      </div>
    </Provider>
  </div>,
  document.getElementById('app')
);
