var React = require('react');
var BarChart = require("react-chartjs").Bar;

var PollBarChart = React.createClass({

  render: function() {
    return <BarChart data={this.props.data} width="300" height="125"/>
  }
});

module.exports = PollBarChart;