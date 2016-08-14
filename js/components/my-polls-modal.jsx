var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;

var MyPollsModal = React.createClass({

  render: function() {
    return (
      <div>
        <Link to={`/users/${this.props.userName}/${this.props.item['.key']}`}>
        <Button bsStyle="primary" bsSize="large" block>
          {this.props.item[2]}
        </Button>
        </Link>
      </div>
    );
  }
});
  
module.exports = MyPollsModal;