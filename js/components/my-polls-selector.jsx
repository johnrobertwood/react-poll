var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollPieChart = require('./pie-chart.jsx');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var MyPollsModal = require('./my-polls-modal.jsx');

var MyPollsSelector = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {pollData: this.props.pollData}
	},

	handleChange: function(e) {
		var firebaseRef = firebase.database().ref('pollData');
		var pollIndex = e.target.getAttribute('data-index');
		var length = this.props.pollData[pollIndex][0].length;
		var dataArr = this.props.pollData[pollIndex][0];
		var updatedPoll;
		var pollKey = e.target.getAttribute('data-key');
		for (var i = 0; i < length; i++) {
			if (dataArr[i].label === e.target.value) {
				this.props.pollData[pollIndex][0][i].value += 1;
				firebaseRef.child(pollKey).update({0: this.props.pollData[pollIndex][0]});
				AppStore.emitChange();
			}
		}
	},

	render: function() {
		var Grid = ReactBootstrap.Grid;
		var Row = ReactBootstrap.Row;
		var Col = ReactBootstrap.Col;
		var FormGroup = ReactBootstrap.FormGroup;
		var ControlLabel = ReactBootstrap.ControlLabel;
		var FormControl = ReactBootstrap.FormControl;
		var Button = ReactBootstrap.Button;
		var _this = this;
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