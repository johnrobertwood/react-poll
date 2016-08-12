var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var loggedIn = true;

var userPolls = [];

var polls = [];

function logIn() {
  loggedIn = true;
}

function logOut() {
  loggedIn = false;
}

function getAllPolls() {
  polls = [];
  firebase.database().ref('pollData').once('value', function(snapshot) {
    var obj = snapshot.val();
    for (var prop in obj) {
      item = [];
      item.push(obj[prop][0])
      item[1] = obj[prop][1] 
      item[2] = obj[prop][2]
      item[".key"] = prop;
      polls.push(item);
    }

    AppStore.emitChange()
  });
}

function getUserPolls(user) {
  userPolls = [];
  firebase.database().ref('pollData').once('value', function(snapshot) {
    var obj = snapshot.val();

    for (var prop in obj) {
      item = [];
      item.push(obj[prop][0])
      item[1] = obj[prop][1] 
      item[2] = obj[prop][2]
      item[".key"] = prop;
      userPolls.push(item);
    }

    userPolls = userPolls.filter(function(poll) {
      return poll[1] === user;
    })

    AppStore.emitChange();
  });
}

function delPoll(key) {

  var firebaseRef = firebase.database().ref('pollData');
  firebaseRef.child(key).set(null, function() {
    AppStore.emitChange();
  })

}

var AppStore = assign({}, EventEmitter.prototype, {

  getUserPolls: function(user) {
    return userPolls;
  },

  getAllPolls: function() {
    return polls;
  },

  loginStatus: function() {
    return loggedIn;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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

  if (action.actionType === "ADD_ITEM") {
    firebase.database().ref('pollData').push(action.item);
    AppStore.emitChange();
  }

  if (action.actionType === "GET_USER_POLLS") {
    getUserPolls(action.user); 
  }

  if (action.actionType === "GET_ALL_POLLS") {
    getAllPolls();
  }

  if (action.actionType === "DEL_POLL") {
    delPoll(action.key);
    AppStore.emitChange();
  }
  
  return true;
});

module.exports = AppStore;




