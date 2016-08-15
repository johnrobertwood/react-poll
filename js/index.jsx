var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;
var Home = require('./components/home.jsx');
var App = require('./components/app.jsx');
var MyPollView = require('./components/my-poll-view.jsx');
var AllPolls = require('./components/all-polls.jsx');
var MyPolls = require('./components/my-polls.jsx');
var AllPollView = require('./components/all-poll-view.jsx');
var AddPoll = require('./components/add-poll.jsx');
require("../css/style.scss");

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
	    <Route path="/addpoll" component={AddPoll} />
	    <Route path="/home" component={Home} />
      <Route path="/users/allpolls/:userName" component={AllPolls} />
      <Route path="/users/allpolls/:userName/:key" component={AllPollView} />
      <Route path="/users/mypolls/:userName" component={MyPolls} />
      <Route path="/users/mypolls/:userName/:key" component={MyPollView} />
      <Route path="*" component={Home} />
    </Route>
  </Router>,
  document.getElementById('container')
)




