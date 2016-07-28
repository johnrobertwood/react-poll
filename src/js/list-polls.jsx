var React = require('react');
var PollApp = require('./poll-app.jsx');
var ReactBootstrap = require('react-bootstrap');
var VoteSelector = require('./vote-selector.jsx');
var $ = require('jquery');

var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';

var ListPolls = React.createClass({

	getInitialState: function() {

		return {polls: [{name: '',options: []}]}
	},

	handlePollSubmit: function() {
		console.log('handle poll submit')
		this.getData();
	},

	getData: function() {
		this.serverRequest = $.ajax({
		  url: url, 
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({polls: data});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	componentDidMount: function() {
		var polls = this.getData();
	},

	componentWillUnmount: function() {
	    this.serverRequest.abort();
  },

  render: function() {
  	var rows = [];
  	var index = 0;
		this.state.polls.forEach(function(poll) {
			console.log(poll);
      rows.push(<VoteSelector data={poll} key={index} />)
      index++;
    }, this);
    return (
  		<div>
  			<div>{rows}</div>
  			<PollApp onPollSubmit={this.handlePollSubmit} />
  		</div>
    );
  } 
});

module.exports = ListPolls;