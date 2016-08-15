var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var loggedIn = true;

var userPolls = [];

var polls = [];

var poll = [];

var showModal = true;

var user = '';

function logIn() {
  loggedIn = true;
}

function logOut() {
  loggedIn = false;
}

function hideModal() {
  showModal = false;
}

function resetModal() {
  showModal = true;
}

function getPoll(key) {
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

    poll = polls.filter(function(poll) {
      return poll[".key"] === key;
    })
    AppStore.emitChange();
  })
  return poll;
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
  return polls;
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
    return userPolls;
  });
}

function delPoll(key, userName) {
  var firebaseRef = firebase.database().ref('pollData');
  firebaseRef.child(key).remove()
  userPolls = userPolls.filter(function(poll) {
    return poll['.key'] !== key;
  })
  hideModal();
  AppStore.emitChange();
  resetModal();
}

var AppStore = assign({}, EventEmitter.prototype, {

  getPoll: function() {
    return poll;
  },

  getUserPolls: function() {
    return userPolls;
  },

  getAllPolls: function() {
    return polls;
  },

  loginStatus: function() {
    return loggedIn;
  },

  getUser: function() {
    return user;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getModalStatus: function() {
    return showModal;
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

  if (action.actionType === "GET_POLL") {
    getPoll(action.key);
  }

  if (action.actionType === "GET_USER_POLLS") {

    getUserPolls(action.user); 
  }

  if (action.actionType === "GET_ALL_POLLS") {
    getAllPolls();
  }

  if (action.actionType === "DEL_POLL") {
    delPoll(action.key, action.userName);
    AppStore.emitChange();
  }

  if (action.actionType === "CURRENT_USER") {
    user = action.user;
    console.log(user);
  }
  
  return true;
});

module.exports = AppStore;




