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

function getPollState() {
  return {
    poll: AppStore.getPoll(),
    showModal: AppStore.getModalStatus(),
    alreadyVoted: AppStore.getVotedStatus()
  };
}

var MyPollView = React.createClass({

	getInitialState: function() {
		return {
			poll: null,
			alreadyVoted: false
		}
	},

	componentWillMount: function() {
		PollActions.getPoll(this.props.params.key, localStorage.getItem('user_name'));
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
	  if (localStorage.getItem('user_name') === this.props.params.user) {
	  	hashHistory.push(`/users/mypolls/${this.props.params.user}`)
	  } else {
		  hashHistory.push('/home');
	  }
	},

	handleChange: function(e) {
	  var key = this.props.params.key;
	  var selection = e.target.value;
	  var user = localStorage.getItem('user_name');
	  PollActions.addVote(key, selection, user);
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
	    	    <Modal.Title>{this.state.poll[0].title}</Modal.Title>
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
    	              defaultValue="default" 
    	              disabled={this.state.alreadyVoted}>
    	              <option disabled value="default"></option>
    	                {this.state.poll[0].data.map(function(subitem, i) {
    	                  return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
    	            </FormControl>
    	            <NewOption keyName={this.state.poll[0]['.key']} alreadyVoted={this.state.alreadyVoted} />
    	          </FormGroup>
    	          <PollPieChart data={this.state.poll[0].data} />
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