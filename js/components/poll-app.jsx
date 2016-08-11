var React = require('react');
var ReactDOM = require('react-dom');
var OptionSelector = require('./option-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollTextInput = require('./PollTextInput.jsx');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var Header = require('./header.jsx');

var PollApp = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {text: '', loggedIn: true, pollData: [], profile: null}
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

	  if (idToken) {
		  this.lock.getProfile(idToken, function (err, profile) {
		    if (err) {
		      console.log("Error loading the Profile", err);
		      return;
		    }
		    this.setState({profile: profile});
		    // console.log(profile)
			  this.firebaseRefs['users'].update(profile);
		  }.bind(this));
	  }

	},

	_onChange: function() {
	  console.log("change listener");
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
		var nextChart = this.state.pollData.concat([pieData, nickname]);

		PollActions.addPoll([pieData, nickname]);

		this.setState({text: nextText, title: nextTitle});

	},

  render: function() {
  	var Row = ReactBootstrap.Row;
  	var Col = ReactBootstrap.Col;
  	var Grid = ReactBootstrap.Grid;
  	console.log(this.state.pollData);
	    return (
	    	<div>
	    	<h2>Poll App</h2>
	  		<Grid>
	  			<Row>
						<Col xs={12} md={3}>
			  			<PollTextInput
			  			  id="new-todo"
			  			  placeholder="What needs to be done?"
			  			  onSave={this._onSave} />
	  				</Col>
						<Col xs={12} md={4} mdOffset={2}>
							<OptionSelector pollData={this.state.pollData} />
						</Col>
					</Row>
	  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = PollApp;