var React = require('react');
var PieChart = require("react-chartjs").Pie;

var PollPieChart = React.createClass({

  render: function() {
    return <PieChart data={this.props.data} width="300" height="125"/>
  }
});

module.exports = PollPieChart;