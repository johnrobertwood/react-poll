var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var ReactBootstrap = require('react-bootstrap');
var browserHistory = require('react-router').browserHistory;
var Login = require('./js/login.jsx');
var Home = require('./js/home.jsx');
var PollApp = require('./js/poll-app.jsx');
var ListPolls = require('./js/list-polls.jsx');



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
    </Route>  
      <Route path="login" component={Login} />
      <Route path="pollapp" component={PollApp} />
      <Route path="listpolls" component={ListPolls} />
  </Router>
), document.getElementById('container'))





