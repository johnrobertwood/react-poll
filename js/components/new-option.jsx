var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var FormControl = ReactBootstrap.FormControl;
var FieldGroup = ReactBootstrap.FieldGroup;
var Button = ReactBootstrap.Button;
var Form = ReactBootstrap.Form
var PollActions = require('../actions/PollActions.jsx');
var hashHistory = require('react-router').hashHistory;
var AppStore = require('../stores/AppStore.jsx');

var NewOption = React.createClass({

	getInitialState: function() {
		return {user_name: localStorage.getItem('user_name'), text: ''}
	},

	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var newOption = this.state.text;
		var pollKey = this.props.keyName;
		var user = this.state.user_name;
		PollActions.newOption(pollKey, newOption, user);
		this.setState({text: ''});
	},

	render: function() {
		if (this.state.user_name) {
			return ( 
				<div>
					<Form className="newOptionForm" onSubmit={this.handleSubmit}>
						<FormControl
						 type="text" 
						 placeholder="Write in your own selection" 
						 value={this.state.text}
						 onChange={this.handleTextChange} 
						 disabled={this.props.alreadyVoted}
						 required />
						<Button 
						 className="submit-button"
						 type="submit"
						 bsStyle="primary"
						 disabled={this.props.alreadyVoted}>Submit Write In</Button>
					</Form>
				</div>
			) 
		} else {
			return (<div></div>);
		}
	}
})

module.exports = NewOption;