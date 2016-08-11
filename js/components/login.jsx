var React = require('react');
var Link = require('react-router').Link;
var Login = React.createClass({

  componentWillMount: function() {
	  this.lock = new Auth0Lock('lfGCmxBWfu6Ibpxhnwgxx6pJ4LTvyKJs', 'woodjohn.auth0.com');
  },
	showLock: function() {
	  this.lock.show();
	},

	render: function() {
		return (
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
		);
	}
});

module.exports = Login;