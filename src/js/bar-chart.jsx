var React = require('react');
var BarChart = require("react-chartjs").Bar;

var SampleBarChart = React.createClass({

  render: function() {
    return <BarChart data={this.props.data} width="300" height="125"/>
  }
});

module.exports = SampleBarChart;