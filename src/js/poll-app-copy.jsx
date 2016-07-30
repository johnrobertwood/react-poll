var React = require('react');
var OptionSelector = require('./option-selector.jsx');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');

// var chartData = [{labels: [],datasets: [{data: [],}]}];

var PollApp = React.createClass({

	getInitialState: function() {
		return {text: '', chartData: []}
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

		var nextText = '';
		var nextChart = this.state.chartData.concat([{labels:choices, datasets:[{data:initialData}]}])
		this.setState({text: nextText, chartData: nextChart});
		this.post(url, [{labels:choices, datasets:[{data:initialData}]}]);

	},


  render: function() {
  	var FieldGroup = ReactBootstrap.FieldGroup;
  	var FormGroup = ReactBootstrap.FormGroup;
  	var FormControl = ReactBootstrap.FormControl;
  	var ControlLabel = ReactBootstrap.ControlLabel;
  	var Button = ReactBootstrap.Button;
  	var Row = ReactBootstrap.Row;
  	var Col = ReactBootstrap.Col;
  	var Grid = ReactBootstrap.Grid;
    return (
  		<Grid>
  			<Row>
					<Col xs={12} md={3}>
		  			<form onSubmit={this.handleSubmit}>
			  			<FormGroup controlId="formControlsText">
			  				<ControlLabel>Poll Title</ControlLabel>
			  				<FormControl type="text" onChange={this.onChange} />
		  				</FormGroup>
							<FormGroup controlId="formControlsTextarea">
			  				<ControlLabel>Options</ControlLabel>
			  				<FormControl componentClass="textarea" rows="4" value={this.state.text} onChange={this.handleInputOptions}/>
							</FormGroup>
		  				<Button>Add Poll</Button>
		  			</form>
  				</Col>
					<Col xs={12} md={4}>
						<OptionSelector chartData={this.state.chartData} />
					</Col>
				</Row>
  		</Grid>
    );
  } 
});

module.exports = PollApp;