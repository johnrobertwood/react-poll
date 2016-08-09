var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Home = require('./home.jsx');
var PollApp = require('./poll-app.jsx');
var Header = require('./header.jsx');

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
      return (
        <div>
          <PollApp idToken={this.state.idToken} lock={this.lock} />
        </div>
      );
    } else {
      return ( 
        <Home lock={this.lock} />
      );
    }
  }
});

module.exports = App;
