var React = require('react');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');
var PollBarChart = require('./bar-chart.jsx');
var ReactBootstrap = require('react-bootstrap');

var chartData = [{labels: [],datasets: [{data: [],}]}];

var OptionSelector = React.createClass({

	getInitialState: function() {
		return {chartData: chartData};
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

	handleDelete: function(e) {
	  this.props.onDelete(e.target.getAttribute('data-index'));
	},

	handleChange: function(e) {
		var pollIndex = e.target.getAttribute('data-index');
		var length = this.props.chartData[pollIndex].labels.length;
		var dataArr = this.props.chartData[pollIndex].labels;
		var updatedPoll;

		for (var i = 0; i < length; i++) {
			if (dataArr[i][0] === e.target.value) {
				this.props.chartData[pollIndex].datasets[0].data[i] += 1;
			}
		}
		this.setState({chartData: this.props.chartData});
		updatedPoll = this.props.chartData[pollIndex];
		this.post(url, updatedPoll);
	},

	render: function() {
		var Grid = ReactBootstrap.Grid;
		var Row = ReactBootstrap.Row;
		var Col = ReactBootstrap.Col;
		var FormGroup = ReactBootstrap.FormGroup;
		var ControlLabel = ReactBootstrap.ControlLabel;
		var FormControl = ReactBootstrap.FormControl;
		var Button = ReactBootstrap.Button;
	  var createItem = function(item, i) {
	    return <div key={i}>
	    				<h3>{item.title}</h3>
	    				<FormGroup controlId="formControlsSelect">
	    					<ControlLabel>Vote!</ControlLabel>
		    				<FormControl componentClass="select" key={i} data-index={i} onChange={this.handleChange} defaultValue="default">
		    					<option disabled value="default"> --- </option>
		    						{item.labels.map(function(subitem, i) {
		    							return <option key={i} value={subitem[0]}>{subitem[0]}</option>}, this)}
		    				</FormControl>
	    				</FormGroup>
								<PollBarChart data={this.props.chartData[i]} />
								<Button onClick={this.handleDelete} key={i} data-index={i} bsStyle="danger">Delete</Button>
								<hr />
							</div>
	  };

	  return 	<div>
							{this.props.chartData.map(createItem, this)}
  					</div>
	}

})

module.exports = OptionSelector;