var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var hashHistory = require('react-router').hashHistory;


var AddPoll = React.createClass({

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
	},

	componentDidMount: function() {
	  AppStore.addChangeListener(this._onChange);

  	var idToken = localStorage.getItem('id_token');
  	var firebaseUserData;

    if (idToken) {
  	  this.lock.getProfile(idToken, function (err, profile) {
  	    if (err) {
  	      console.log("Error loading the Profile", err);
  	      this.handleLogout();
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
		var text = this.state.text;
		var user = this.state.profile.nickname;
		PollActions.addPoll(title, text, user)
		hashHistory.push(`/users/${this.state.profile.nickname}`);
	},

	handleLogout: function() {
		localStorage.removeItem('id_token');
    localStorage.removeItem('user_name');
		hashHistory.push('/');
		PollActions.logOut();
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
	  		<Grid>
	  			<Row>
						<Col xs={10} md={6} xsOffset={1} mdOffset={3}>
				    	<h2>Poll App</h2>
			  			<form onSubmit={this.handleSubmit}>
				  			<FormGroup controlId="formControlsText">
				  				<ControlLabel>Poll Title</ControlLabel>
				  				<FormControl 
				  				 type="text" 
				  				 onChange={this.handleInputTitle} 
				  				 value={this.state.title} 
				  				 placeholder="Poll Title"
				  				 maxLength="60"
				  				 required />
			  				</FormGroup>
								<FormGroup controlId="formControlsTextarea">
				  				<ControlLabel>Options (separated by commas)</ControlLabel>
				  				<FormControl 
				  				 componentClass="textarea" 
				  				 rows="4" 
				  				 value={this.state.text} 
				  				 onChange={this.handleInputOptions} 
				  				 placeholder="Options"
				  				 maxLength="80" 
				  				 required/>
								</FormGroup>
			  				<Button 
			  				className="submit-button"
			  				bsStyle="primary" 
			  				block>Add Poll</Button>
			  			</form>
	  				</Col>
					</Row>
	  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = AddPoll;