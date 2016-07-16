var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var ReactBootstrap = require('react-bootstrap');
var browserHistory = require('react-router').browserHistory;
var Login = require('./js/login.jsx');
var Home = require('./js/home.jsx');
var NewPoll = require('./js/new-poll.jsx');




// var PollList = React.createClass({
// 	getInitialState: function() {
// 		return {polls: this.props.polls}
// 	},
//   handlePollDelete: function(delPoll) {
//     var polls = this.state.polls;
//     for (var i = 0; i < polls.length; i++) {
//       if (polls[i].name === delPoll.name) {
//         polls.splice(i, 1);
//       }
//     }
//     localStorage.setItem('polls', JSON.stringify(polls));
//     this.setState({polls: polls});
//   },
//   handlePollEdit: function(editPoll) {
//     var polls = this.state.polls;
//     for (var i = 0; i < polls.length; i++) {
//       if (polls[i].name === editPoll.name) {
//         polls[i].options = editPoll.options;
//       }
//     }
//     localStorage.setItem('polls', JSON.stringify(polls));
//     this.setState({polls: polls});
//   },
// 	render: function() {
// 		var rows = [];
// 		var options = [];
// 		var Accordion = ReactBootstrap.Accordion;
// 		var Panel = ReactBootstrap.Panel;
// 		var index = 0;
// 		this.props.polls.forEach(function(poll) {
//       rows.push(<Panel header={poll.name} eventKey={index++} key={index}>
// 				<p>Options:</p>
// 				<OptionList poll={poll} onDelete={this.handlePollDelete} onPollEdit={this.handlePollEdit} />
// 				</Panel>
// 				);
// 		}, this);
// 		return (
// 			<div>
// 				<Accordion>{rows}</Accordion>
// 			</div>
// 		);
// 	}
// });

// var NewPoll = React.createClass({
// 	  getInitialState: function() {
// 			return {polls: this.props.polls}
// 		},
// 		handlePollSubmit: function(poll) {
// 	    this.props.polls.push(poll);
// 	    localStorage.setItem('pollBox', JSON.stringify(this.props.polls));
// 			this.setState({polls: this.props.polls});
// 		},
// 	  render: function() {
// 	    return (
// 	    	<div>
// 		    	<div>
// 			    	<h1>New Poll</h1>
// 			      <ul>
// 			        <li><a href="/">Home</a></li>
// 			        <li><a href="login">Login!!</a></li>
// 			      </ul>
// 		  		</div>
// 		      <div>
// 		        <h1>Create Poll</h1>
// 					  <PollList polls={this.state.polls}  />
// 				  </div>
// 	  		</div>
// 	    )
// 	  } 
// })

var POLLS = [
  {name: "President", options: ["Trump", "Sea Hag"]}
];

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
    </Route>  
      <Route path="login" component={Login} />
      <Route path="newpoll" component={NewPoll} />
  </Router>
), document.getElementById('container'))





