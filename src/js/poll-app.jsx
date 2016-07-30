var React = require('react');
var OptionSelector = require('./option-selector.jsx');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var SampleBarChart = require('./bar-chart.jsx');
var $ = require('jquery');

var chartData = [{labels: [],datasets: [{data: [],}]}];

var PollApp = React.createClass({

	getInitialState: function() {
		return {items: [], text: '', chartData: chartData}
	},

	componentDidMount: function() {
		this.getData();
	},

	componentWillUnmount: function() {
	  this.serverRequest.abort();
  },

  transformData: function(data) {
  	var bigData = [];
  	dataArr = data.map(function(item) {
  		var labels = item.text.map(function(item) {
  			return item[0];
  		})
  		var dataArr = item.text.map(function(item) {
  			return item[1];
  		})
  		var datasets = [{data: dataArr}];

  		bigData.push({labels: labels, datasets: datasets})
  	})
  	this.setState({items: data, chartData: bigData});
  },

	getData: function() {
		this.serverRequest = $.ajax({
		  url: url, 
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.transformData(data);
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
	    	console.log("Data posted");
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
			return [item, 0];
		});
		var nextItems = this.state.items.concat([{text: choices}]);
		var nextText = '';
		this.setState({items: nextItems, text: nextText});
		this.post(url, [{text: choices}]);
	},

  render: function() {
    return (
  		<div>
  			<form onSubmit={this.handleSubmit}>
  				<label htmlFor="options">Options</label><br/>
  				<textarea rows="4" value={this.state.text} onChange={this.handleInputOptions}/><br/>
  				<button> Add Poll </button>
  			</form>
  			<OptionSelector items={this.state.items} />

  		</div>
    );
  } 
});

module.exports = PollApp;