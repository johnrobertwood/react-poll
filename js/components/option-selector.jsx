var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollPieChart = require('./pie-chart.jsx');

var OptionSelector = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {pollData: this.props.pollData};
	},

	componentWillMount: function() {
		var firebaseRef = firebase.database().ref('pollData');
	},

	handleDelete: function(key) {
		var firebaseRef = firebase.database().ref('pollData');
		firebaseRef.child(key).remove();
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
				firebaseRef.child(pollKey).update({0: this.state.pollData[pollIndex][0]});
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
	    				<div className="row">
		    				<FormGroup controlId="formControlsSelect">
		    					<ControlLabel>Vote</ControlLabel>
			    				<FormControl 
			    				  componentClass="select" 
			    				  key={i} data-index={i} 
			    				  data-key={item['.key']} 
			    				  onChange={this.handleChange} 
			    				  defaultValue="default">
			    					<option disabled value="default">{this.props.title}</option>
			    						{item[0].map(function(subitem, i) {
			    							return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
			    				</FormControl>
		    				</FormGroup>
								<PollPieChart data={item[0]} />
								<Button onClick={_this.handleDelete.bind(null, item['.key'])} bsStyle="danger">Delete</Button>
	    				</div>
							<hr />
						</div>
	  };
	  return 	<div>
							{this.state.pollData.map(createItem, this)}
  					</div>
	}
})

module.exports = OptionSelector;