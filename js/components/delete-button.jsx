var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollPieChart = require('./pie-chart.jsx');
var PollActions = require('../actions/PollActions.jsx');
var AppStore = require('../stores/AppStore.jsx');
var DeleteButton = require('./delete-button.jsx');


var DeleteButton = React.createClass({

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

	handleDelete: function(key) {
		PollActions.delPoll(key);
	},

	render: function() {
		console.log(this.props.pollData);
		var Grid = ReactBootstrap.Grid;
		var Row = ReactBootstrap.Row;
		var Col = ReactBootstrap.Col;
		var FormGroup = ReactBootstrap.FormGroup;
		var ControlLabel = ReactBootstrap.ControlLabel;
		var FormControl = ReactBootstrap.FormControl;
		var Button = ReactBootstrap.Button;
		var _this = this;
	  if (this.props.loggedIn) {
	    return (
				<div key={this.props.i}>
  				<div className="row">
    				<FormGroup controlId="formControlsSelect">
    					<ControlLabel>Vote</ControlLabel>
	    				<FormControl 
	    				  componentClass="select" 
	    				  key={this.props.i} data-index={this.props.i} 
	    				  data-key={this.props.item['.key']} 
	    				  onChange={this.handleChange} 
	    				  defaultValue="default">
	    					<option disabled value="default">{this.props.title}</option>
	    						{this.props.item[0].map(function(subitem, i) {
	    							return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
	    				</FormControl>
    				</FormGroup>
						<PollPieChart data={this.props.item[0]} />
						<Button onClick={_this.handleDelete.bind(null, this.props.item['.key'])} bsStyle="danger">Delete</Button>
  				</div>
					<hr />
				</div>
	    );
	  } else {
	    return ( 
				<div key={this.props.i}>
  				<div className="row">
    				<FormGroup controlId="formControlsSelect">
    					<ControlLabel>Vote</ControlLabel>
	    				<FormControl 
	    				  componentClass="select" 
	    				  key={this.props.i} data-index={this.props.i} 
	    				  data-key={this.props.item['.key']} 
	    				  onChange={this.handleChange} 
	    				  defaultValue="default">
	    					<option disabled value="default">{this.props.title}</option>
	    						{item[0].map(function(subitem, i) {
	    							return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
	    				</FormControl>
    				</FormGroup>
						<PollPieChart data={this.props.item[0]} />
  				</div>
					<hr />
				</div>
	    );
	  }
	}
})

module.exports = DeleteButton;