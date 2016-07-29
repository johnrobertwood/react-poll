var React = require('react');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');

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

	getData: function() {
		this.serverRequest = $.ajax({
		  url: url, 
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({items: data});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	post: function(url, data) {
		console.log(data);
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json",
	    success: function(data) {
	    	console.log(data);
	    }.bind(this),
	    error: function(xhr, status, err) {
	      console.error(this.props.url, status, err.toString());
	    }.bind(this)
		})	
	},

	handleChange: function(e) {
		console.log(e.target.getAttribute('data-index'));
		var pollIndex = e.target.getAttribute('data-index');
		var updatedPoll;
		this.props.items[pollIndex].text.forEach(function(item) {
			if (item[0] === e.target.value) {
				item[1] += 1;
			}
		})
		this.transformData(this.props.items);
		updatedPoll = this.props.items[pollIndex];
		this.post(url, updatedPoll);
		console.log(updatedPoll);
	},

	render: function() {
	  var createItem = function(item, i) {
	    return <div key={i}>
	    					<select key={i} data-index={i} onChange={this.handleChange} defaultValue="default">
	    						<option disabled value="default"> --- </option>
	    							{item.text.map(function(subitem, i) {
	    								return <option key={i} value={subitem[0]}>{subitem[0]}</option>}, this)}
	    					</select>
	    						{item.text.map(function(subitem, i) {
	    						  	return <li key={i}>{subitem[0]}--{subitem[1]}</li>}, this)}
	    				</div>

	  };
	  var createList = function(item, i) {
	  	return <ul key={i}>{item.text.map(function(subitem, i) {
	  		return <li key={i}>{subitem[0]}--{subitem[1]}</li>
	  	}, this)}</ul>
	  };

	  return 	<div>
	  					<div>{this.props.items.map(createItem, this)}</div>
  					</div>
	}

})

module.exports = OptionSelector;