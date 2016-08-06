var React = require('react');
var PieChart = require("react-chartjs").Pie;

var PollPieChart = React.createClass({

  render: function() {
		 	
    return <PieChart data={this.props.data} />
  }
});

module.exports = PollPieChart;