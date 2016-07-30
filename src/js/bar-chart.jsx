var React = require('react');
var BarChart = require("react-chartjs").Bar;

// var SampleBarChart = React.createClass({

//   render: function() {
//   	console.log(this.props.data);
//   	var createChart = function(item, i) {
// 	    return <BarChart key={i} data={item} width="300" height="125"/>
//   	}

//     return <div>{this.props.data.map(createChart, this)}</div>
//   }
// });
var SampleBarChart = React.createClass({

  render: function() {
  	console.log(this.props.data);
    return <BarChart data={this.props.data} width="300" height="125"/>
  }
});

module.exports = SampleBarChart;