var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _users = [
  {name: "John", loginStatus: false}, 
  {name: "Trump", loginStatus: false}
];

var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    console.log(_users);
    return _users;
  },

  toggleLogin: function(name) {
    console.log(name);
    users = _users.map(function(user) {
      if (name === user.name) {
        user.loginStatus = !user.loginStatus;
      }
        return user;
    });
    return users;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  
});

AppDispatcher.register(function(payload){
  console.log(payload);

  if (payload.action.actionType === "LOG_IN") {
    AppStore.toggleLogin(payload.action.user);  
    AppStore.emitChange();
  }
  return true;
});

module.exports = AppStore;
