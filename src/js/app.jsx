var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./home.jsx');
var LoggedIn = require('./loggedin.jsx');
var PollApp = require('./poll-app.jsx');
var ReactBootstrap = require('react-bootstrap');

var App = React.createClass({

  componentWillMount: function() {
	  this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
      // Set the state with a property that has the token
	  this.setState({idToken: this.getIdToken()})
  },
  createLock: function() {
      this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
  },
  getIdToken: function() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },
  render: function() {
    if (this.state.idToken) {
      return (<PollApp idToken={this.state.idToken} />);
    } else {
      return (<Home lock={this.lock} />);
    }
  }
});

module.exports = App;
