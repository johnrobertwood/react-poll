var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var hashHistory = require('react-router').hashHistory;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = ReactBootstrap.Button;
var Form = ReactBootstrap.Form;
var AppStore = require("../stores/AppStore.jsx");
var PollActions = require("../actions/PollActions.jsx");
var PollPieChart = require('./poll-pie-chart.jsx');
var DeleteButton = require('./delete-button.jsx');
var NewOption = require('./new-option.jsx');
var TwitterButton = require('react-social').TwitterButton;
var ConfirmMessage = require('./confirm-message.jsx');

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
			alreadyVoted: false,
			selection: ''
		}
	},

	componentWillMount: function() {
		PollActions.getPoll(this.props.params.key, localStorage.getItem('user_name'));
		this.setState({showModal: true});
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
		this.setState({selection: e.target.value});
	},	

	handleClick: function() {
		var user = localStorage.getItem('user_name');
		var selection = this.state.selection;
		var key = this.props.params.key;
	  if (selection) {
		  PollActions.addVote(key, selection, user);
	  }
	},

  render: function() {
  	if (!this.state.poll) {
			return (<div></div>)
		} else if (this.state.alreadyVoted) {
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
		            <ConfirmMessage alreadyVoted={this.state.alreadyVoted} />
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
	    	           	<ConfirmMessage alreadyVoted={this.state.alreadyVoted} />
	    	            <FormControl 
	    	              componentClass="select" 
	    	              data-key={this.state.poll['.key']} 
	    	              defaultValue="default"
	    	              onChange={this.handleChange}
	    	              disabled={this.state.alreadyVoted} >
	    	              <option disabled value="default"></option>
	    	                {this.state.poll[0].data.map(function(subitem, i) {
	    	                  return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
	    	            </FormControl>
	    	           	<Button
	    	           	  className="submit-button" 
		    	           	disabled={this.state.alreadyVoted} 
		    	           	onClick={this.handleClick}
		    	           	bsStyle="primary">Submit Vote</Button>
	    	            <NewOption 
	    	             keyName={this.state.poll[0]['.key']} 
	    	             alreadyVoted={this.state.alreadyVoted} />
	    	          </FormGroup>
    	          <PollPieChart 
    	           data={this.state.poll[0].data} />
    	          <DeleteButton 
    	           userName={this.props.params.userName} 
    	           keyName={this.state.poll[0]['.key']} />
    	        </div>
    	      </div>
	    	  </Modal.Body>
	    	  <Modal.Footer>
	    	    <Button 
		    	    onClick={this.close} 
		    	    bsStyle="info" 
		    	    block>Close</Button>	
	    	  </Modal.Footer>
	    	</Modal>
	  		</div>
    	)
    }
  } 
});

module.exports = MyPollView;