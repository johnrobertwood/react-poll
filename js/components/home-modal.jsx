var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = require('react-bootstrap').Button;
var Tooltip = require('react-bootstrap').Tooltip;
var Popover = require('react-bootstrap').Popover;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var PollActions = require('../actions/PollActions.jsx');
var PollPieChart = require('./pie-chart.jsx');
var AppStore = require('../stores/AppStore.jsx');


var ExampleModal = React.createClass({

  getInitialState: function() {
    return { showModal: false, pollData: [] };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  handleDelete: function(key) {
    PollActions.delPoll(key);
    this.close();
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

    var _this = this;
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open} block>
          {this.props.item[2]}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.item[2]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

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
                      <option disabled value="default"></option>
                        {this.props.item[0].map(function(subitem, i) {
                          return <option key={i} value={subitem.label}>{subitem.label}</option>}, this)}
                    </FormControl>
                  </FormGroup>
                  <PollPieChart data={this.props.item[0]} />
                </div>
                <hr />
              </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
  
module.exports = ExampleModal;