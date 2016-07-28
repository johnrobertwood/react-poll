var React = require('react');

var VoteSelector = React.createClass({

	  render: function() {
	  	return (
	  		<div>
	  		  <select>
	  		    <option value={this.props.data.options[0]}>{this.props.data.options[0]}</option>
	  		    <option value={this.props.data.options[1]}>{this.props.data.options[1]}</option>
			    </select>
		    </div>
			)
	  }
})

module.exports = VoteSelector;