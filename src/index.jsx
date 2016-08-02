var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var ReactBootstrap = require('react-bootstrap');
var Home = require('./js/home.jsx');
var PollApp = require('./js/poll-app.jsx');
var App = require('./js/app.jsx');


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
	    <Route path="pollapp" component={PollApp} />
    </Route>
  </Router>,
  document.getElementById('container')
)






