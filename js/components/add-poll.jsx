var React = require('react');
var ReactDOM = require('react-dom');
var OptionSelector = require('./option-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');

var AddPoll = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			title: '', 
			text: '', 
			loggedIn: true, 
			pollData: [], 
			profile: null, 
			users: {}
		}
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
		var firebaseRef = firebase.database().ref('pollData');
		this.bindAsArray(firebaseRef, 'pollData');
	},

	componentDidMount: function() {

	  var userRef = firebase.database().ref('users')
	  this.bindAsArray(userRef, 'users');
	  AppStore.addChangeListener(this._onChange);

  	var idToken = localStorage.getItem('id_token');
  	var firebaseUserData;

    if (idToken) {
  	  this.lock.getProfile(idToken, function (err, profile) {
  	    if (err) {
  	      console.log("Error loading the Profile", err);
  	      return;
  	    }
  	    this.setState({profile: profile});
  	  }.bind(this));
    }

	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
	  console.log("change listener");
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
		var nickname = this.state.profile.nickname;
		var nextText = '';
		var nextTitle = '';
		var nextChart = this.state.pollData.concat([pieData]);

		PollActions.addPoll([pieData, nickname, title]);

		this.setState({text: nextText, title: nextTitle});
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
	    	<div>
	    	<h2>Poll App</h2>
	  		<Grid>
	  			<Row>
						<Col xs={12} md={3}>
			  			<form onSubmit={this.handleSubmit}>
				  			<FormGroup controlId="formControlsText">
				  				<ControlLabel>Poll Title</ControlLabel>
				  				<FormControl 
				  				 type="text" 
				  				 onChange={this.handleInputTitle} 
				  				 value={this.state.title} 
				  				 placeholder="Poll Title" 
				  				 required />
			  				</FormGroup>
								<FormGroup controlId="formControlsTextarea">
				  				<ControlLabel>Choices (separated by commas)</ControlLabel>
				  				<FormControl 
				  				 componentClass="textarea" 
				  				 rows="4" 
				  				 value={this.state.text} 
				  				 onChange={this.handleInputOptions} 
				  				 placeholder="Options" 
				  				 required/>
								</FormGroup>
			  				<Button type="submit">Add Poll</Button>
			  			</form>
	  				</Col>
					</Row>
	  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = AddPoll;