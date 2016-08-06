var React = require('react');
var ReactDOM = require('react-dom');
var OptionSelector = require('./option-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var Home = require('./home.jsx');

// var chartData = [{labels: [],datasets: [{data: [],}]}];

var PollApp = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {text: '', title: '', loggedIn: true, pollData: []}
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
		var firebaseRef = firebase.database().ref('reactPoll/pollData');
		this.bindAsArray(firebaseRef, 'pollData');
	},

	componentWillUnmount: function() {
	  this.serverRequest.abort();
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
		var colors = choices.map(function() {
			return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
			  return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
		})
		var initialData = choices.map(function(item) {return 0;});
		var pieData = parseText.map(function(item) {
			var obj = {}
			obj.label = item;
			obj.color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
			  return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
			obj.value = 0;
			return obj;
		})
		var nextText = '';
		var nextTitle = '';
		var nextChart = this.state.pollData.concat([pieData]);
		this.firebaseRefs['pollData'].push([pieData]);		
		this.setState({text: nextText, title: nextTitle});
	},

	handleLogout: function() {
		localStorage.removeItem('id_token');
		this.setState({loggedIn: false});
		console.log("hello")
	},

	handleDelete: function(delIndex) {
		updatedPoll = this.state.pollData[delIndex];
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
							<OptionSelector pollData={this.state.pollData} onDelete={this.handleDelete} />
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