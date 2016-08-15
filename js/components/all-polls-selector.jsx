var React = require('react');
var MyPollsModal = require('./my-polls-modal.jsx');
var AllPollsModal = require('./all-polls-modal.jsx');

var AllPollsSelector = React.createClass({

	render: function() {
	  var createItem = function(item, i) {

	  		return (
	  			<AllPollsModal
						item={item}
						loggedIn={false}
						i={i}
						key={i}
						pollData={this.props.pollData} 
						userName={item[1]} />
				);
	  };
	  return 	<div>
							{this.props.pollData.map(createItem, this)}
  					</div>
	}
})

module.exports = AllPollsSelector;