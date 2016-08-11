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
    pollData: AppStore.getUserPolls()
  };
}

var MyPolls = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {pollData: [], profile: null, firebaseUser: null}
	},

	_onChange: function() {
		this.setState(getPollState());
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
	},

	componentDidMount: function() {

		var idToken = localStorage.getItem('id_token');
		var firebaseUserData;
		AppStore.addChangeListener(this._onChange);

	  if (idToken) {
		  this.lock.getProfile(idToken, function (err, profile) {
		    if (err) {
		      console.log("Error loading the Profile", err);
		      return;
		    }
		    this.setState({profile: profile});
		    PollActions.getPolls(profile.nickname);
		  }.bind(this));
	  }

	},

	handleDelete: function(delIndex) {
		updatedPoll = this.state.pollData[delIndex];
	},

  render: function() {
  	var Row = ReactBootstrap.Row;
  	var Col = ReactBootstrap.Col;
  	var Grid = ReactBootstrap.Grid;
  	// console.log(this.state.pollData);

    return (
    	<div>
    	<h3>My Polls!</h3>
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