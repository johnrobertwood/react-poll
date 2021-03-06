var React = require('react');
var ReactDOM = require('react-dom');
var Login = require('./login.jsx');
var Home = require('./home.jsx');
var Header = require('./header.jsx');
var AppStore = require('../stores/AppStore.jsx');
var hashHistory = require('react-router').hashHistory;
var PollActions = require('../actions/PollActions.jsx');

function getLoginState() {
  return {
    loggedIn: AppStore.loginStatus()
  };
}

var App = React.createClass({

  getInitialState: function() {
    return {idToken: '', loggedIn: true};
  },

  _onChange: function() {
    this.setState(getLoginState());
  },

  componentWillMount: function() {
	  this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
	  this.setState({idToken: this.getIdToken()})
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
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
        PollActions.logIn();
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },

  showLock: function() {
    this.lock.show();
  },

  render: function() {

    if (this.state.idToken && this.state.loggedIn) {
      return (
        <div>
          <Header idToken={this.state.idToken} lock={this.lock} />

          {this.props.children}

        </div>

      );
    } else {
      return ( 
        <div>
          <Login lock={this.lock} />

          {this.props.children}

        </div>
      );
    }
  }
});

module.exports = App;
