var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var PollActions = require('../actions/PollActions.jsx');
var PollPieChart = require('./pie-chart.jsx');
var AppStore = require('../stores/AppStore.jsx');
var MyPollModalView = require('./my-poll-modal-view.jsx');


var MyPollsModal = React.createClass({

  getInitialState: function() {
    return { showModal: false, pollData: [] };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    console.log("open");
    this.setState({ showModal: true });
  },

  handleDelete: function(key) {
    var userName = this.props.userName;
    PollActions.delPoll(key, userName);
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
        <Link to={`/users/${this.props.userName}/${this.props.item['.key']}`}>
        <Button bsStyle="primary" bsSize="large" onClick={this.open} block>
          {this.props.item[2]}
        </Button>
        </Link>
        <MyPollModalView i={this.props.i} item={this.props.item} />
      </div>
    );
  }
});
  
module.exports = MyPollsModal;