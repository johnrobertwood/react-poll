var React = require('react');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');
var SampleBarChart = require('./bar-chart.jsx');

var chartData = [{labels: [],datasets: [{data: [],}]}];

var OptionSelector = React.createClass({

	transformData: function(data) {
		var bigData = [];
		dataArr = data.map(function(item) {
			var labels = item.labels.map(function(item) {
				return item[0];
			})
			var dataArr = item.labels.map(function(item) {
				return item[1];
			})
			var datasets = [{data: dataArr}];

			bigData.push({labels: labels, datasets: datasets})
		})
		this.setState({items: data, chartData: bigData});
	},

	getInitialState: function() {
		return {items: this.props.items, chartData: this.props.chartData};
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

	handleChange: function(e) {
		var pollIndex = e.target.getAttribute('data-index');
		var updatedPoll;
		var dataArr = this.props.chartData[pollIndex].labels;
		var length = this.props.chartData[pollIndex].labels.length;

		for (var i = 0; i < length; i++) {
			if (dataArr[i][0] === e.target.value) {
				this.props.chartData[pollIndex].datasets[0].data[i] += 1;
			}
		}

		updatedPoll = this.props.chartData[pollIndex];
		this.post(url, updatedPoll);
	},

	render: function() {
	  var createItem = function(item, i) {
	    return <div key={i}>
	    					<select key={i} data-index={i} onChange={this.handleChange} defaultValue="default">
	    						<option disabled value="default"> --- </option>
	    							{item.labels.map(function(subitem, i) {
	    								return <option key={i} value={subitem[0]}>{subitem[0]}</option>}, this)}
	    					</select>
	    						{item.datasets[0].data.map(function(subitem, i) {
	    						  	return <li key={i}>{subitem}</li>}, this)}
    							<div><SampleBarChart data={this.state.chartData[i]} /></div>
	    				</div>
	  };

	  return 	<div>
	  					<div>{this.props.chartData.map(createItem, this)}</div>
  					</div>
	}

})

module.exports = OptionSelector;