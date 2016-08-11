var React = require('react');
var DeleteButton = require('./delete-button.jsx');

var OptionSelector = React.createClass({

	getInitialState: function() {
		return {pollData: this.props.pollData, loggedIn: false}
	},

	render: function() {
	  return 	<div>
							{this.props.pollData.map(function(item, i) {
								<DeleteButton item={item} i={i} pollData={this.props.pollData} />
							})}
  					</div>
	}
})

module.exports = OptionSelector;