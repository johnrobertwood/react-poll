var ShowResults = React.createClass({

  render: function() {
		console.log(this.props.data);
  	return 	<div>
  						<table>
  							<tr>
  							  <th>{this.props.data.labels[0]}</th>
  							  <th>{this.props.data.labels[1]}</th>
							  </tr>
							  <tr>
							    <td>{this.props.data.datasets[0].data[0]}</td>
							    <td>{this.props.data.datasets[0].data[1]}</td>
						    </tr>
							</table>
  					</div>
  }
})