var React = require('react');

var Test = React.createClass({

  render: function() {

	    return (
	    	<div>
	    		<h3>{this.props.params.userName}</h3>
	  		</div>
	    );	
  } 
});

module.exports = Test;