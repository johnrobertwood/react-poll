var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;
var Home = require('./components/home.jsx');
var App = require('./components/app.jsx');
var Login = require('./components/login.jsx');
var Test = require('./components/test.jsx');
var UserPolls = require('./components/user-polls.jsx');
var AddPoll = require('./components/add-poll.jsx');
var MyPollModalView = require('./components/my-poll-modal-view.jsx');
require("../css/style.scss");


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
	    <Route path="/addpoll" component={AddPoll} />
	    <Route path="/home" component={Home} />
      <Route path="/users/:userName" component={UserPolls} />
      <Route path="/users/:userName/:key" component={Test} />
      <Route path="*" component={Home} />
    </Route>
  </Router>,
  document.getElementById('container')
)




