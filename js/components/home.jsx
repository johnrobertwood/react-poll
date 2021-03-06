var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var AllPollsSelector = require('./all-polls-selector.jsx');

function getPollState() {
  return {
    pollData: AppStore.getAllPolls()
  };
}

var UserPolls = React.createClass({

	getInitialState: function() {
		return getPollState();
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
		PollActions.getAllPolls();
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
    return (
    	<div>
	    	<h2>Vote on a Poll or Create Your Own</h2>
	  		<Grid>
	  			<Row>
					<AllPollsSelector 
					 pollData={this.state.pollData} 
					 userName={this.props.params.userName} 
					 loggedIn={true} />
				</Row>
	  		</Grid>
  		</div>
    );	
  } 
});

module.exports = UserPolls;