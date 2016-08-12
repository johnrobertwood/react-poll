var React = require('react');
var ReactDOM = require('react-dom');
var HomeSelector = require('./home-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');

function getPollState() {
  return {
    pollData: AppStore.getAllPolls()
  };
}

var Login = React.createClass({

	mixins: [ReactFireMixin],

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

	showLock: function() {
	  this.lock.show();
	},

	_onChange: function() {
		this.setState(getPollState());
	},

  render: function() {
  	var Row = ReactBootstrap.Row;
  	var Col = ReactBootstrap.Col;
  	var Grid = ReactBootstrap.Grid;
  	var Link = require('react-router').Link;
	    return (
	    	<div>
	    	<div className="login-box">
	    	<header>
	    	  <nav>
	    	    <ul>
	    	      <li><Link to="/">Home</Link></li>
	    	      <li className="login-box" onClick={this.showLock}>Sign In</li>
	    	    </ul>
	    	  </nav>
	    	</header>
	    	</div>
	    	<h3>Home</h3>
	  		<Grid>
	  			<Row>
						<Col xs={12} md={4} mdOffset={2}>
							<HomeSelector pollData={this.state.pollData} />
						</Col>
					</Row>
	  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = Login;