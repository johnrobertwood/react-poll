var React = require('react');
var BarChart = require("react-chartjs").Bar;

var PollBarChart = React.createClass({

  render: function() {
    return <BarChart data={this.props.data} />
  }
});

module.exports = PollBarChart;