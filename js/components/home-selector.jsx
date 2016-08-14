var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var HomeModal = require('./home-modal.jsx');

var HomeSelector = React.createClass({

	getInitialState: function() {
		return {pollData: this.props.pollData}
	},

	render: function() {
		var PanelGroup = ReactBootstrap.PanelGroup;

		
	  var createItem = function(item, i) {
	    return <HomeModal 
	    				item={item} 
	    				loggedIn={true} 
	    				i={i} 
	    				key={i} 
	    				pollData={this.props.pollData} />
	  };
	  return 	<PanelGroup defaultActiveKey="1">
							{this.props.pollData.map(createItem, this)}
  					</PanelGroup>
	}
})

module.exports = HomeSelector;