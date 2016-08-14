var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var hashHistory = require('react-router').hashHistory;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = ReactBootstrap.Button;
var AppStore = require("../stores/AppStore.jsx");
var PollActions = require("../actions/PollActions.jsx");
var PollPieChart = require('./pie-chart.jsx');

function getPollState() {
  return {
    poll: AppStore.getPoll(),
    showModal: AppStore.getModalStatus()
  };
}

var Test = React.createClass({

	getInitialState: function() {
		return {
			poll: null
		}
	},

	componentWillMount: function() {
		PollActions.getPoll(this.props.params.key);
		this.setState({showModal: true})
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getPollState());
	},

	close: function() {
	  this.setState({ showModal: false });
	  hashHistory.push(`/users/${this.props.params.userName}`)
	},

	handleChange: function(e) {
	  var firebaseRef = firebase.database().ref('pollData');
	  var pollIndex = e.target.getAttribute('data-index');
	  var pollKey = this.props.params.key;
	  var length = this.state.poll[0].length;
	  var dataArr = this.state.poll[0];
	  var updatedPoll;
	  for (var i = 0; i < length - 1; i++) {
	    if (dataArr[0][i].label === e.target.value) {
	      this.state.poll[0][0][i].value += 1;
	      firebaseRef.child(pollKey).update({0: this.state.poll[0][0]});
	      AppStore.emitChange();
	    }
	  }
	},

	handleDelete: function(key) {
	  var userName = this.props.params.userName;
	  PollActions.delPoll(key, userName);
	  hashHistory.push(`/users/${this.props.params.userName}`)
	},

  render: function() {
  	var _this = this;
  	if (!this.state.poll) {
			return (<div></div>)
		} else {
	    return (
	    	<div>
	    	<Modal show={this.state.showModal} onHide={this.close}>
	    	  <Modal.Header closeButton>
	    	    <Modal.Title>{this.state.poll[2]}</Modal.Title>
	    	  </Modal.Header>
	    	  <Modal.Body>
    	      <div>
    	        <div className="row">
    	          <FormGroup controlId="formControlsSelect">
    	            <ControlLabel>Vote</ControlLabel>
    	            <FormControl 
    	              componentClass="select" 
    	              data-key={this.state.poll['.key']} 
    	              onChange={this.handleChange} 
    	              defaultValue="default">
    	              <option disabled value="default"></option>
    	                {this.state.poll[0][0].map(function(subitem, i) {
    	                  return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
    	            </FormControl>
    	          </FormGroup>
    	          <PollPieChart data={this.state.poll[0][0]} />
    	          <Button onClick={_this.handleDelete.bind(null, this.state.poll[0]['.key'])} bsStyle="danger" block>Delete</Button>
    	        </div>
    	      </div>
	    	  </Modal.Body>
	    	  <Modal.Footer>
	    	    <Button onClick={this.close} bsStyle="info" block>Close</Button>
	    	  </Modal.Footer>
	    	</Modal>
	  		</div>
    	)
    }
  } 
});

module.exports = Test;