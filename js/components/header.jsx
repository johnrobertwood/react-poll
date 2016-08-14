var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var hashHistory = require('react-router').hashHistory;
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');

var Header = React.createClass({

	mixins: [ReactFireMixin],

  getInitialState: function() {
    return {profile: {}}  
  },

  componentWillMount: function() {
    this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
  },

  componentDidMount: function() {
    var idToken = localStorage.getItem('id_token');

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

	handleLogout: function() {
		localStorage.removeItem('id_token');
		hashHistory.push('/');
		PollActions.logOut();
	},

  render: function() {
    return (
    	<div>
    	<header>
    	  <nav>
    	    <ul>
    	      <li><Link to="/home" activeClassName="active">Home</Link></li>
    	      <li><Link to="/addpoll" activeClassName="active">Add Poll</Link></li>
            <li><Link to={`/users/${this.state.profile.nickname}`}>User Polls</Link></li>
    	      <li className="login-box" onClick={this.handleLogout}><Button>Sign Out</Button></li>
    	    </ul>
    	  </nav>
    	</header>
	    </div>
    );
  }
});

module.exports = Header;