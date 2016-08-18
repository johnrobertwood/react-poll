var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var MyPollsModal = React.createClass({

  render: function() {
    return (
      <Col xs={12} md={8} mdOffset={2}>
        <Link to={`/users/mypolls/${this.props.userName}/${this.props.poll['.key']}`}>
        <Button bsStyle="primary" bsSize="large" className="poll-button" block>
          {this.props.poll.title}
        </Button>
        </Link>
      </Col>
    );
  }
});
  
module.exports = MyPollsModal;