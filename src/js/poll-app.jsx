var React = require('react');
var OptionSelector = require('./option-selector.jsx');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');

// var chartData = [{labels: [],datasets: [{data: [],}]}];


var PollApp = React.createClass({

	getInitialState: function() {
		return {items: [], text: '', chartData: []}
	},

	componentDidMount: function() {
		this.getData();
	},

	componentWillUnmount: function() {
	  this.serverRequest.abort();
  },

	getData: function() {
		this.serverRequest = $.ajax({
		  url: url, 
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({chartData: data});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	post: function(url, data) {
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json",
	    success: function(data) {
	    	this.getData();
	    }.bind(this),
	    error: function(xhr, status, err) {
	      console.error(this.props.url, status, err.toString());
	    }.bind(this)
		})	
	},

	handleInputOptions: function(e) {
		this.setState({text: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var parseText = this.state.text.split(' ').join('').split(',');
		var choices = parseText.map(function(item) {
			return [item];
		});
		var initialData = choices.map(function(item) {
			return 0;
		})

		console.log(initialData);

		var nextItems = this.state.items.concat([{text: choices}]);
		var nextText = '';
		var nextChart = this.state.chartData.concat([{labels:choices, datasets:[{data:initialData}]}])
		this.setState({items: nextItems, text: nextText, chartData: nextChart});
		this.post(url, [{labels:choices, datasets:[{data:initialData}]}]);

	},


  render: function() {
    return (
  		<div>
  			<form onSubmit={this.handleSubmit}>
  				<label htmlFor="options">Options</label><br/>
  				<textarea rows="4" value={this.state.text} onChange={this.handleInputOptions}/><br/>
  				<button> Add Poll </button>
  			</form>
  			<OptionSelector chartData={this.state.chartData} />
  		</div>
    );
  } 
});

module.exports = PollApp;