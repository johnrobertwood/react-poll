var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var PollConstants = require('../constants/PollConstants.jsx');

var PollActions = {
  
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

  getPoll: function(key) {
    AppDispatcher.dispatch({
      actionType: PollConstants.GET_POLL,
      key: key
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
  },

  delPoll: function(key, user) {
    AppDispatcher.dispatch({
      actionType: PollConstants.DEL_POLL,
      key: key,
      userName: user
    });
  },

  setCurrentUser: function(user) {
    AppDispatcher.dispatch({
      actionType: PollConstants.CURRENT_USER,
      user: user
    });
  }

};

module.exports = PollActions;
