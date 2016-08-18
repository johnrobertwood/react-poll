var React = require('react');
var MyPollsSelector = require('./my-polls-selector.jsx');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');

function getPollState() {
  return {
    pollData: AppStore.getUserPolls()
  };
}

var UserMyPolls = React.createClass({

	getInitialState: function() {
		return getPollState();
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
		PollActions.getUserPolls(this.props.params.userName);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getPollState());
	},

  render: function() {
  	var Row = ReactBootstrap.Row;
  	var Col = ReactBootstrap.Col;
  	var Grid = ReactBootstrap.Grid;
  	  if (this.state.pollData[0] === undefined) {
  	  	return (
	  	  	<div>
	  	  	  <h2>MyPolls</h2>
	  	  	  <h2>No polls created yet</h2>
		  	  </div>
	  		)
  	  } else {
		    return (
		    	<div>
		    		<h2>My Polls</h2>
			  		<Grid>
			  			<Row>
								<MyPollsSelector 
								 pollData={this.state.pollData} 
								 userName={this.props.params.userName} />
							</Row>
			  		</Grid>
		  		</div>
		    );	

  	  }
  } 
});

module.exports = UserMyPolls;