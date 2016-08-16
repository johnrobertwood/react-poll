var React = require('react');
var PieChart = require('react-chartjs').Pie;
var AppStore = require('../stores/AppStore.jsx');

var PollPieChart = React.createClass({

  getInitialState: function() {
    // return {legend: ""}
    return {legend: this.refs.chart}
  },

	componentDidMount: function() {
		var legend = this.refs.chart.getChart().generateLegend();
    this.setState({legend: legend});
    AppStore.addChangeListener(this._onChange);
	},

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var legend = this.refs.chart.getChart().generateLegend();
    this.setState({legend: legend});
  },

  render: function() {

  	var legend = this.state && this.state.legend || '';

  	var chartOptions = {

  	    //Boolean - Whether we should show a stroke on each segment
  	    segmentShowStroke : true,

  	    //String - The colour of each segment stroke
  	    segmentStrokeColor : "#fff",

  	    //Number - The width of each segment stroke
  	    segmentStrokeWidth : 2,

  	    //Number - The percentage of the chart that we cut out of the middle
  	    percentageInnerCutout : 50, // This is 0 for Pie charts

  	    //Number - Amount of animation steps
  	    animationSteps : 100,

  	    //String - Animation easing effect
  	    animationEasing : "easeOutBounce",

  	    //Boolean - Whether we animate the rotation of the Doughnut
  	    animateRotate : false,

  	    //Boolean - Whether we animate scaling the Doughnut from the centre
  	    animateScale : false
  	}
    console.log(this.state.legend);
    return (
    	<div className="chart">
	    	<div className="legend" dangerouslySetInnerHTML={{ __html: legend }} />
        <PieChart data={this.props.data} options={chartOptions} ref='chart' />
	    </div>
    )
  }
});

module.exports = PollPieChart;