var React = require('react');
var ReactDOM = require('react-dom');
var OptionSelector = require('./option-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollTextInput = require('./PollTextInput.jsx');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var Header = require('./header.jsx');

function getPollState() {
  return {
    loggedIn: AppStore.getUserPolls()
  };
}

var Test = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {pollData: [], profile: null, firebaseUser: null}
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
	},

	componentDidMount: function() {

		var idToken = localStorage.getItem('id_token');
		var userRef = firebase.database().ref('users');
		var pollRef = firebase.database().ref('pollData');
		this.bindAsArray(userRef, 'users');
		var firebaseUserData;
		// this.bindAsArray(pollData, 'pollData');
	  if (idToken) {
		  this.lock.getProfile(idToken, function (err, profile) {
		    if (err) {
		      console.log("Error loading the Profile", err);
		      return;
		    }
		    this.setState({profile: profile});
		    this.updatePollData();
				PollActions.getPolls(profile.nickname);
		  }.bind(this));
	  }

		pollRef.once('value', function(snapshot) {
			this.setState({firebaseUser: snapshot.val()});
			this.updatePollData();
		}.bind(this));


		AppStore.addChangeListener(this._onChange);

	},

	updatePollData: function() {
		var userPolls;
		if (this.state.pollData.length && this.state.profile) {
			var nickname = this.state.profile.nickname;
			userPolls = this.state.pollData.filter(function(poll) {
				return poll[1] === nickname;
			})

			this.setState({pollData: userPolls});

		}
	},

	_onChange: function() {
		this.setState(getPollState());
	},

	handleDelete: function(delIndex) {
		updatedPoll = this.state.pollData[delIndex];
	},

  render: function() {
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

module.exports = Test;