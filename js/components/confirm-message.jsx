var React = require('react');

var ConfirmMessage = React.createClass({

	render: function() {
		if (this.props.alreadyVoted) {
			return ( 
				<div>
					<h3>Thanks for voting</h3>
				</div>
			) 
		} else {
			return (<div></div>);
		}
	}
})

module.exports = ConfirmMessage;