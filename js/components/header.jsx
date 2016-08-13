var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
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
    	      <li><Link to="/home" activeClassName="active">Home</Link></li>
    	      <li><Link to="/mypolls" activeClassName="active">My Polls</Link></li>
    	      <li><Link to="/addpoll" activeClassName="active">Add Poll</Link></li>
    	      <li className="login-box" onClick={this.handleLogout}><Button>Sign Out</Button></li>
    	    </ul>
    	  </nav>
    	</header>
	    </div>
    );
  }
});

module.exports = Header;