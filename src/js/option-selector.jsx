var React = require('react');
var PollBarChart = require('./bar-chart.jsx');
var PollPieChart = require('./pie-chart.jsx');
var ReactBootstrap = require('react-bootstrap');

// var pollData = [{labels: [],datasets: [{data: [],}]}];

var OptionSelector = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {pollData: this.props.pollData};
	},

	componentWillMount: function() {
		var firebaseRef = firebase.database().ref('reactPoll/pollData');

	},

	handleDelete: function(key) {
		var firebaseRef = firebase.database().ref('reactPoll/pollData');
		firebaseRef.child(key).remove();
	},

	handleChange: function(e) {
		var firebaseRef = firebase.database().ref('reactPoll/pollData');
		var pollIndex = e.target.getAttribute('data-index');
		console.log(this.props.pollData[pollIndex]);
		var length = this.props.pollData[pollIndex].length;
		var dataArr = this.props.pollData[pollIndex];
		var updatedPoll;
		var pollKey = e.target.getAttribute('data-key');
		for (var i = 0; i < length; i++) {
			if (dataArr[i].label === e.target.value) {
				this.props.pollData[pollIndex][i].value += 1;
				this.setState({pollData: this.props.pollData});
				firebaseRef.child(pollKey).set(this.state.pollData)
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
	    return <div key={i}>
	    				<FormGroup controlId="formControlsSelect">
	    					<ControlLabel>Vote</ControlLabel>
		    				<FormControl componentClass="select" key={i} data-index={i} data-key={item['.key']} onChange={this.handleChange} defaultValue="default">
		    					<option disabled value="default"> --- </option>
		    						{item.map(function(subitem, i) {
		    							return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
		    				</FormControl>
	    				</FormGroup>

								<PollPieChart data={this.props.pollData[i]} />
								<Button onClick={_this.handleDelete.bind(null, item['.key'])} bsStyle="danger">Delete</Button>
								<hr />
							</div>
	  };

	  return 	<div>
							{this.props.pollData.map(createItem, this)}
  					</div>
	}

})

module.exports = OptionSelector;