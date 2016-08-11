var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');

var Header = React.createClass({

	mixins: [ReactFireMixin],

	handleLogout: function() {
		localStorage.removeItem('id_token');
		hashHistory.push('/');
		PollActions.logOut();
	},

    _onChange: function() {
      console.log("change listener");
    },

  render: function() {
    return (
    	<div>
    	<header>
    	  <nav>
    	    <ul>
    	      <li><Link to="/home">Home</Link></li>
    	      <li><Link to="/mypolls">My Polls</Link></li>
    	      <li><Link to="/addpoll">Add Poll</Link></li>
    	      <li className="login-box" onClick={this.handleLogout}>Sign Out</li>
    	    </ul>
    	  </nav>
    	</header>
	    </div>
    );
  }
});

module.exports = Header;