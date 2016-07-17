var React = require('react');

var PollList = React.createClass({
	getInitialState: function() {
		return {polls: this.props.polls}
	},
	render: function() {
		return (
			<div>
				{this.state.polls}
			</div>
		);
	}
});

module.exports = PollList;