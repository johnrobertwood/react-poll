var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var MyPollsModal = React.createClass({

  render: function() {
    return (
      <Col xs={12} md={4}>
        <Link to={`/users/mypolls/${this.props.userName}/${this.props.item['.key']}`}>
        <Button bsStyle="primary" bsSize="large" className="poll-button" block>
          {this.props.item[2]}
        </Button>
        </Link>
      </Col>
    );
  }
});
  
module.exports = MyPollsModal;