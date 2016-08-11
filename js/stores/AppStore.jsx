var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var loggedIn = true;

var userPolls = [];

function toggleLogin() {
  loggedIn = !loggedIn;
}

function logIn() {
  loggedIn = true;
}

function logOut() {
  loggedIn = false;
}

function setUserPolls(user) {
  firebase.database().ref('pollData').once('value', function(snapshot) {

    var obj = snapshot.val();
    for (var prop in obj) {
      userPolls.push(obj[prop])
    }

    userPolls = userPolls.filter(function(poll) {
      return poll[1] === user;
    })
    AppStore.emitChange();

  })
}

var AppStore = assign({}, EventEmitter.prototype, {

  getUserPolls: function(user) {

    return userPolls;
  },

  loginStatus: function() {
    return loggedIn;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  
});

AppDispatcher.register(function(action){
  var text;

  if (action.actionType === "LOG_IN") {
    loggedIn = true;
    AppStore.emitChange();
  }

  if (action.actionType === "LOG_OUT") {
    loggedIn = false;
    AppStore.emitChange();
  }

  if (action.actionType === "TOGGLE_LOGIN") {
    toggleLogin();
    AppStore.emitChange();
  }

  if (action.actionType === "ADD_ITEM") {
    firebase.database().ref('pollData').push(action.item);
    AppStore.emitChange();
  }

  if (action.actionType === "GET_POLLS") {
    setUserPolls(action.user);
    
    
  }
  return true;
});

module.exports = AppStore;




