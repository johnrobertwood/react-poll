var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var PollConstants = require('../constants/PollConstants.jsx');

var PollActions = {
  
  toggleLogin: function() {
    AppDispatcher.dispatch({
      actionType: PollConstants.TOGGLE_LOGIN
    });
  },

  logIn: function() {
    AppDispatcher.dispatch({
      actionType: PollConstants.LOG_IN
    });
  },

  logOut: function() {
    AppDispatcher.dispatch({
      actionType: PollConstants.LOG_OUT
    });
  },
  
  addPoll: function(item) {
    AppDispatcher.dispatch({
      actionType: PollConstants.ADD_ITEM,
      item: item
    });
  }

}

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

module.exports = PollActions;
