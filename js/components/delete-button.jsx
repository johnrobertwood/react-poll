var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PollActions = require('../actions/PollActions.jsx');
var hashHistory = require('react-router').hashHistory;
var TwitterButton = require('react-social').TwitterButton

var DeleteButton = React.createClass({

	getInitialState: function() {
		return {user_name: localStorage.getItem('user_name')}
	},

	close: function() {
	  this.setState({ showModal: false });
	  hashHistory.push(`/users/allpolls/${this.props.userName}`)
	},

	handleDelete: function(key) {
	  var userName = this.props.userName;
	  PollActions.delPoll(key, userName);
	  hashHistory.push(`/users/allpolls/${this.props.userName}`)
	},

	render: function() {
		var Button = ReactBootstrap.Button;
		var _this = this;
		if (this.state.user_name === this.props.userName) {
			return ( 
				<div>
					<TwitterButton className="twitter-button">Tweet</TwitterButton>
					<Button onClick={_this.handleDelete.bind(null, this.props.keyName)} bsStyle="danger" block>Delete</Button>
				</div>
			) 
		} else {
			return (<div></div>);
		}
	}
})

module.exports = DeleteButton;