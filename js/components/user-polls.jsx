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

var UserPolls = React.createClass({

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
	    return (
	    	<div>
		  		<Grid>
		  			<Row>
							<Col xs={12} md={6} mdOffset={3}>
								<MyPollsSelector 
								 pollData={this.state.pollData} 
								 userName={this.props.params.userName} 
								 loggedIn={true} />
							</Col>
						</Row>
		  		</Grid>
	  		</div>
	    );	
  } 
});

module.exports = UserPolls;