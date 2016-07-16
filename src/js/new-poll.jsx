var NewPoll = React.createClass({

	render: function() {
		return (
			<div>
				<h1>New Poll</h1>
				<ul>
				  <li><a href="/">Home</a></li>
				  <li><a href="login">Login</a></li>
				  <li><a href="newpoll">New Poll!!</a></li>
				</ul>
			</div>
		);
	}
});

module.exports = NewPoll;