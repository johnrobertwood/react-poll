var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollList = require('./poll-list.jsx');
var jQuery = require('jquery');

var NewPoll = React.createClass({

	getInitialState: function() {
	  return {data: []};
	},

	componentDidMount: function() {
	  jQuery.ajax({
	    url: 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR',
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
	      this.setState({data: data});
	      console.log(data)
	    }.bind(this),
	    error: function(xhr, status, err) {
	      console.error(this.props.url, status, err.toString());
	    }.bind(this)
	  });
	},

  render: function() {
  	var Panel = ReactBootstrap.Panel;
  	var Button = ReactBootstrap.Button;
  	var createItem = function(item) {
  	  return <Panel key={item.name}>{item.name}</Panel>;
  	};
    return (
    	<div>
	    	<div>
		    	<h1>New Poll</h1>
		      <ul>
		        <li><a href="/">Home</a></li>
		        <li><a href="login">Login!!</a></li>
		      </ul>
	  		</div>
	      <div>
	        <h1>Create Poll</h1>
				  <div>{this.state.data.map(createItem)}</div>
			  </div>
  		</div>
    )
  } 
});

module.exports = NewPoll;