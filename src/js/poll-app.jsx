var React = require('react');
var OptionSelector = require('./option-selector.jsx');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var Home = require('./home.jsx');

// var chartData = [{labels: [],datasets: [{data: [],}]}];

var PollApp = React.createClass({

	getInitialState: function() {
		return {text: '', title: '', chartData: [], loggedIn: true}
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
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

	del: function(url, data) {
		$.ajax({
			url: url,
			type: "DELETE",
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
	handleInputTitle: function(e) {
		this.setState({title: e.target.value});
	},

	handleInputOptions: function(e) {
		this.setState({text: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var title = this.state.title;
		var parseText = this.state.text.split(' ').join('').split(',');
		var choices = parseText.map(function(item) {return [item];});
		var initialData = choices.map(function(item) {return 0;});
		var nextText = '';
		var nextTitle = '';
		var nextChart = this.state.chartData.concat([{tite: title, labels:choices, datasets:[{data:initialData}]}])
		this.setState({text: nextText, title: nextTitle, chartData: nextChart});
		this.post(url, [{title: title, labels:choices, datasets:[{data:initialData}]}]);

	},

	handleLogout: function() {
		localStorage.removeItem('id_token');
		this.setState({loggedIn: false});
	},

	handleDelete: function(delIndex) {
		updatedPoll = this.state.chartData[delIndex];
		console.log(this.state.chartData[delIndex]);
		this.del(url, updatedPoll);
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
  	if (this.state.loggedIn) {
	    return (
	  		<Grid>
	  			<Row>
						<Col xs={12} md={3}>
			  			<form onSubmit={this.handleSubmit}>
				  			<FormGroup controlId="formControlsText">
				  				<ControlLabel>Poll Title</ControlLabel>
				  				<FormControl type="text" onChange={this.handleInputTitle} value={this.state.title} required />
			  				</FormGroup>
								<FormGroup controlId="formControlsTextarea">
				  				<ControlLabel>Choices (separated by commas)</ControlLabel>
				  				<FormControl componentClass="textarea" rows="4" value={this.state.text} onChange={this.handleInputOptions} required/>
								</FormGroup>
			  				<Button type="submit">Add Poll</Button>
			  				<Button onClick={this.handleLogout} bsStyle="danger">Logout</Button>
			  			</form>
	  				</Col>
						<Col xs={12} md={4} mdOffset={2}>
							<OptionSelector chartData={this.state.chartData} onDelete={this.handleDelete} />
						</Col>
					</Row>
	  		</Grid>
	    );	
  	} else {
  		return ( <Home lock={this.lock} />)
  	}
  } 
});

module.exports = PollApp;