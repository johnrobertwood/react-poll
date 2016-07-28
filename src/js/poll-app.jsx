var React = require('react');
var $ = require('jquery');

var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';

var OptionSelector = React.createClass({

	getInitialState: function() {
		console.log(this.props.items);
		return {items: this.props.items}
	},

	handleChange: function(e) {
		console.log(e.target.value);
		console.log(this.props.items);
	},

	render: function() {
	  var createItem = function(item, i) {
	    return <select key={i} onChange={this.handleChange} defaultValue="default">
	    					<option disabled value="default"> --- </option>
	    					{item.text.map(function(subitem, i) {
	    						return <option key={i} value={subitem.choice}>{subitem.choice}</option>
	    }, this)}</select>;
	  };
	  var countItem = function(item, i) {
	  	return <ul key={i}>{item.text.map(function(subitem, i) {
	  		return <li key={i}>{subitem.count}</li>
	  	}, this)}</ul>;
	  }
	  return 	<div>
	  					<div>{this.props.items.map(createItem, this)}</div>
	  					<div>{this.props.items.map(countItem, this)}</div>
  					</div>
	}

})

var PollApp = React.createClass({

	getInitialState: function() {
		return {items: [], text: ''}
	},

	componentWillUnmount: function() {
	  this.serverRequest.abort();
  },

	handleInputOptions: function(e) {
		this.setState({text: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var parseText = this.state.text.split(' ').join('').split(',');
		var objects = parseText.map(function(item) {
			return {choice: item, count: 0};
		});
		var nextItems = this.state.items.concat([{text: objects}]);
		var nextText = '';
		this.setState({items: nextItems, text: nextText});
	},

	post: function(url, data) {
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json",
	    success: function(data) {
	    	this.props.onPollSubmit(data);
	    }.bind(this),
	    error: function(xhr, status, err) {
	      console.error(this.props.url, status, err.toString());
	    }.bind(this)
		})	
	},

  render: function() {
    return (
  		<div>
  			<form onSubmit={this.handleSubmit}>
  				<label htmlFor="options">Options</label><br/>
  				<textarea rows="4" value={this.state.text} onChange={this.handleInputOptions}/><br/>
  				<button> Add Poll </button>
  			</form>
  			<OptionSelector items={this.state.items} />
  		</div>
    );
  } 
});

module.exports = PollApp;