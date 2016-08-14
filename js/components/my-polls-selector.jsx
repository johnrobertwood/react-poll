var React = require('react');
var MyPollsModal = require('./my-polls-modal.jsx');

var MyPollsSelector = React.createClass({

	render: function() {
	  var createItem = function(item, i) {
	    return <MyPollsModal 
	    				item={item} 
	    				loggedIn={true} 
	    				i={i} 
	    				key={i} 
	    				pollData={this.props.pollData} 
	    				userName={this.props.userName} />
	  };
	  return 	<div>
							{this.props.pollData.map(createItem, this)}
  					</div>
	}
})

module.exports = MyPollsSelector;