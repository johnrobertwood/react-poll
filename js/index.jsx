var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;
var PollApp = require('./components/poll-app.jsx');
var App = require('./components/app.jsx');
var Home = require('./components/home.jsx');
var MyPolls = require('./components/my-polls.jsx');
var Test = require('./components/test.jsx');
var AddPoll = require('./components/add-poll.jsx');
require("../css/style.scss");


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/test" component={Test} />
	    <Route path="/addpoll" component={AddPoll} />
	    <Route path="/mypolls" component={MyPolls} />
      <Route path="*" component={PollApp} />
    </Route>
  </Router>,
  document.getElementById('container')
)

// ReactDOM.render(<App />, document.getElementById('container'));




