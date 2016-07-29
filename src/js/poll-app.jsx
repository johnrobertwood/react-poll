var React = require('react');
var $ = require('jquery');
var BarChart = require("react-chartjs").Bar;

var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';

var OptionSelector = React.createClass({

	transformData: function(data) {
		var datasets = [];
		var labels = data[0].text.map(function(item) {
			return item[0];
		})
		var dataArr = data[0].text.map(function(item) {
				return item[1];
			});
		datasets.push({data: dataArr});
		this.setState({data: {labels: labels, datasets: datasets}});
		return {labels: labels, datasets: datasets};
	},

	getInitialState: function() {
		return {items: this.props.items, data: {}};
	},

	handleChange: function(e) {
		console.log(e.target.getAttribute('data-index'));
		var pollIndex = e.target.getAttribute('data-index');
		this.props.items[pollIndex].text.forEach(function(item) {
			if (item[0] === e.target.value) {
				item[1] += 1;
			}
		})
		this.transformData(this.props.items);
		console.log(this.props.items);
	},

	render: function() {
	  var createItem = function(item, i) {
	    return <select key={i} data-index={i} onChange={this.handleChange} defaultValue="default">
	    					<option disabled value="default"> --- </option>
	    					{item.text.map(function(subitem, i) {
	    						return <option key={i} value={subitem[0]}>{subitem[0]}</option>
	    }, this)}</select>
	  };
	  var createList = function(item, i) {
	  	return <ul key={i}>{item.text.map(function(subitem, i) {
	  		return <li key={i}>{subitem[0]}--{subitem[1]}</li>
	  	}, this)}</ul>
	  };

	  return 	<div>
	  					<div>{this.props.items.map(createItem, this)}</div>
	  					<div>{this.props.items.map(createList, this)}</div>
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
		var choices = parseText.map(function(item) {
			return [item, 0];
		});
		var nextItems = this.state.items.concat([{text: choices}]);
		var nextText = '';
		this.setState({items: nextItems, text: nextText});
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