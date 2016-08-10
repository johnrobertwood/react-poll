var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
var PollActions = require('../actions/PollActions.jsx');

var Header = React.createClass({

	mixins: [ReactFireMixin],

	// getInitialState: function() {
	// 	return {text: '', title: '', loggedIn: true, pollData: [], profile: null}
	// },

	// componentDidMount: function() {
	//   The token is passed down from the App component 
	//   and used to retrieve the profile
	//   var userRef = firebase.database().ref('users')
	//   this.bindAsArray(userRef, 'users');

	//   if (this.props.idToken) {
	// 	  this.props.lock.getProfile(this.props.idToken, function (err, profile) {
	// 	    if (err) {
	// 	      console.log("Error loading the Profile", err);
	// 	      return;
	// 	    }
	// 	    this.setState({profile: profile});
	// 		  this.firebaseRefs['users'].update({profile: this.state.profile});
	// 	  }.bind(this));
	//   }

	// },

	// componentWillMount: function() {
	// 	this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
	// 	var firebaseRef = firebase.database().ref('pollData');
	// 	this.bindAsArray(firebaseRef, 'pollData');
	// },

	handleLogout: function() {
		localStorage.removeItem('id_token');
		// this.setState({loggedIn: false});
		hashHistory.push('/');
		PollActions.logOut();
	},

  // showLock: function() {
  //   this.props.lock.show();
  // },

  render: function() {
    return (
    	<div>
    	<header>
    	  <nav>
    	    <ul>
    	      <li><Link to="/">Home</Link></li>
    	      <li><Link to="/mypolls">My Polls</Link></li>
    	      <li><Link to="/addpoll">Add Poll</Link></li>
    	      <li><Link to="/test">Test!</Link></li>
    	      <li className="login-box" onClick={this.handleLogout}>Sign Out</li>
    	    </ul>
    	  </nav>
    	</header>
	    </div>
    );
  }
});

module.exports = Header;