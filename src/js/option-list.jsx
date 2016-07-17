var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var EditRecipeModal = require('./edit-recipe-modal.jsx');

var IngredientList = React.createClass({
	handleRecipeEdit: function(recipe) {
    this.props.onRecipeEdit(recipe);
	},
  handleRecipeDelete: function(recipe) {
    this.props.onDelete(recipe);
  },
  render: function() {
    var Panel = ReactBootstrap.Panel;
    var Button = ReactBootstrap.Button;
    var createItem = function(item) {
      return <Panel key={item}>{item}</Panel>;
    };
    return (
      <div>{this.props.recipe.ingredients.map(createItem)}
        <EditRecipeModal 
          recipe={this.props.recipe} 
          onRecipeEdit={this.handleRecipeEdit} 
          onRecipeDelete={this.handleRecipeDelete} 
          key={Date.now()}/>
      </div>);
  }
});

module.exports = IngredientList;