var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var PollApp = require('./components/poll-app.jsx');
var App = require('./components/app.jsx');
var Home = require('./components/home.jsx');
require("../css/style.scss");


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>

  </Router>,
  document.getElementById('container')
)






