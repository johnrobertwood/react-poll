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
  },

  getUserPolls: function(user) {
    AppDispatcher.dispatch({
      actionType: PollConstants.GET_USER_POLLS,
      user: user
    });
  },

  getAllPolls: function() {
    AppDispatcher.dispatch({
      actionType: PollConstants.GET_ALL_POLLS
    })
  }

};

module.exports = PollActions;
