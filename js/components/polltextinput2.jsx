var React = require('react');

var ENTER_KEY_CODE = 13;

var PollTextInput = React.createClass({

  getInitialState: function() {
    return {
      title: '',
      choices: ''
    };
  },

  handleTitleChange: function(e) {
    this.setState({ title: e.target.value });
  },
  handleChoiceChange: function(e) {
    this.setState({ choices: e.target.value });
  },
  handleSubmit: function() {
    var title = this.state.title;
    var choices = this.state.choices.split(',');
    this.props.onRecipeSubmit({name: name, ingredients: ingredients});
    this.close();
    this.setState({name: '', ingredients: []});
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <form>
        <input
          className={this.props.className}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          value={this.state.value}
          autoFocus={true}/>

        <input
          className={this.props.className}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          value={this.state.value}/>
      </form>
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _saveTitle: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _saveChoices: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },

  /**
   * @param  {object} event
   */
  _onChoiceKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._saveChoices();
    }
  },
  _onTitleKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._saveChoices();
    }
  }

});

module.exports = PollTextInput;
