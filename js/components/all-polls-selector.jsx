var React = require('react');
var MyPollsModal = require('./my-polls-modal.jsx');
var HomeModal = require('./home-modal.jsx');

var AllPollsSelector = React.createClass({

	render: function() {
	  var createItem = function(item, i) {

	  	if (this.props.userName === item[1]) {
	  		console.log("user modal")
		    return (
  				<MyPollsModal 
	  				item={item} 
	  				loggedIn={true} 
	  				i={i} 
	  				key={i} 
	  				pollData={this.props.pollData} 
	  				userName={this.props.userName} />
				);
	  	} else {
	  		console.log("home modal")
	  		return (
	  			<HomeModal
						item={item}
						loggedIn={false}
						i={i}
						key={i}
						pollData={this.props.pollData} />
				);
	  	}
	  };
	  return 	<div>
							{this.props.pollData.map(createItem, this)}
  					</div>
	}
})

module.exports = AllPollsSelector;