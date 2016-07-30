var React = require('react');

var Home = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Auth!</h1>
				<ul>
				  <li><a href="/">Home</a></li>
				  <li><a href="login">Login</a></li>
				  <li><a href="pollapp">Poll App</a></li>
				</ul>
			</div>
		);
	}
});

module.exports = Home;