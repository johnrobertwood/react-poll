var React = require('react');
var MyPollsModal = require('./my-polls-modal.jsx');
var AllPollsModal = require('./all-polls-modal.jsx');

var AllPollsSelector = React.createClass({

	render: function() {
	  var createItem = function(poll, i) {
	  		return (
	  			<AllPollsModal
						poll={poll}
						i={i}
						key={i}
						userName={poll.user} />
				);
	  };
	  return 	<div>
							{this.props.pollData.map(createItem, this)}
  					</div>
	}
})

module.exports = AllPollsSelector;