var React = require('react');
var HomeSelector = require('./home-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');

function getPollState() {
  return {
    pollData: AppStore.getAllPolls()
  };
}

var PollApp = React.createClass({

	getInitialState: function() {
		return getPollState();
	},

	componentWillMount: function() {
		this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
	},

	componentDidMount: function() {
	  var idToken = localStorage.getItem('id_token');

	  AppStore.addChangeListener(this._onChange);

	  if (idToken) {
		  this.lock.getProfile(idToken, function (err, profile) {
		    if (err) {
		      console.log("Error loading the Profile", err);
		      return;
		    }
		    this.setState({profile: profile});
		  }.bind(this));
	  }

	  PollActions.getAllPolls();

	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getPollState());
	},

  render: function() {
  	var Row = ReactBootstrap.Row;
  	var Col = ReactBootstrap.Col;
  	var Grid = ReactBootstrap.Grid;
	    return (
	    	<div>
	  		<Grid>
	  			<Row>
						<Col xs={12} md={6} mdOffset={3}>
							<HomeSelector pollData={this.state.pollData} />
						</Col>
					</Row>
	  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = PollApp;