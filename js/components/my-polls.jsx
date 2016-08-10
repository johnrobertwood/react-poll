var React = require('react');
var ReactDOM = require('react-dom');
var OptionSelector = require('./option-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollTextInput = require('./PollTextInput.jsx');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var Header = require('./header.jsx');

var MyPolls = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {text: '', title: '', loggedIn: true, pollData: [], profile: null}
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
		var firebaseRef = firebase.database().ref('pollData');
		this.bindAsArray(firebaseRef, 'pollData');
	},

	componentDidMount: function() {
	  // The token is passed down from the App component 
	  // and used to retrieve the profile
	  var userRef = firebase.database().ref('users')
	  this.bindAsArray(userRef, 'users');

	  AppStore.addChangeListener(this._onChange);

	  if (this.props.idToken) {
		  this.props.lock.getProfile(this.props.idToken, function (err, profile) {
		    if (err) {
		      console.log("Error loading the Profile", err);
		      return;
		    }

		    this.setState({profile: profile});
			  this.firebaseRefs['users'].update({profile: this.state.profile});
		  }.bind(this));
	  }
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

	handleLogout: function() {
		localStorage.removeItem('id_token');
		this.setState({loggedIn: false});
		browserHistory.push('/');
	},

	handleDelete: function(delIndex) {
		updatedPoll = this.state.pollData[delIndex];
	},

	_onSave: function(text) {

		var parseText = text.split(' ').join('').split(',');
		var choices = parseText.map(function(item) {return [item];});
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
		var nickname = this.state.profile.nickname;
		var nextChart = this.state.pollData.concat([pieData]);

		PollActions.addPoll([pieData, nickname]);

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
	    	<h3>My Polls</h3>
	  		<Grid>
	  			<Row>
						<Col xs={12} md={4} mdOffset={2}>
							<OptionSelector pollData={this.state.pollData} />
						</Col>
					</Row>
	  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = MyPolls;