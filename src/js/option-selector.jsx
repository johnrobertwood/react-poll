var React = require('react');
var url = 'https://api.mlab.com/api/1/databases/votingapp/collections/polls?apiKey=Wfc5q2m2_pkfpuW5Qtj0aYwH8H6DinFR';
var $ = require('jquery');

var OptionSelector = React.createClass({


	transformData: function(data) {
		var bigData = [];
		console.log(data);
		dataArr = data.map(function(item) {
			var labels = item.text.map(function(item) {
				return item[0];
			})

			var dataArr = item.text.map(function(item) {
				return item[1];
			})

			var datasets = [{data: dataArr}];

			bigData.push({labels: labels, datasets: datasets})
		})
		this.setState({items: data, chartData: bigData});
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
		  	console.log(data)
		    this.transformData(data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	post: function(url, data) {
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json",
	    success: function(data) {
	    	this.getData();
	    }.bind(this),
	    error: function(xhr, status, err) {
	      console.error(this.props.url, status, err.toString());
	    }.bind(this)
		})	
	},

	handleChange: function(e) {
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

	  return 	<div>
	  					<div>{this.props.items.map(createItem, this)}</div>
  					</div>
	}

})

module.exports = OptionSelector;