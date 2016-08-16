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
var PollPieChart = require('./poll-pie-chart.jsx');
var DeleteButton = require('./delete-button.jsx');
var NewOption = require('./new-option.jsx');
var TwitterButton = require('react-social').TwitterButton;

function getPollState() {
  return {
    poll: AppStore.getPoll(),
    showModal: AppStore.getModalStatus()
  };
}

var MyPollView = React.createClass({

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
	  hashHistory.push(`/users/mypolls/${this.props.params.userName}`)
	},

	handleChange: function(e) {
	  var firebaseRef = firebase.database().ref('pollData');
	  var pollIndex = e.target.getAttribute('data-index');
	  var pollKey = this.props.params.key;
	  var length = this.state.poll[0][0].length;
	  var dataArr = this.state.poll[0];
	  var updatedPoll;
	  for (var i = 0; i < length; i++) {
	    if (dataArr[0][i].label === e.target.value) {
	      this.state.poll[0][0][i].value += 1;
	      firebaseRef.child(pollKey).update({0: this.state.poll[0][0]});
	      AppStore.emitChange();
	    }
	  }
	},

  render: function() {
  	if (!this.state.poll) {
			return (<div></div>)
		} else {
	    return (
	    	<div>
	    	<Modal show={this.state.showModal} onHide={this.close}>
	    	  <Modal.Header closeButton>
	    	    <Modal.Title>{this.state.poll[0][2]}</Modal.Title>
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
    	            <NewOption keyName={this.state.poll[0]['.key']} />
    	          </FormGroup>
    	          <PollPieChart data={this.state.poll[0][0]} />
    	          <DeleteButton userName={this.props.params.userName} keyName={this.state.poll[0]['.key']} />
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

module.exports = MyPollView;