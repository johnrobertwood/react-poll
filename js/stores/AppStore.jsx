var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

var CHANGE_EVENT = 'change';

var _users = [
  {name: "John", loginStatus: false}, 
  {name: "Trump", loginStatus: false}
];

var loggedIn = false;

// function toggleLogin(name) {
//   console.log(name);
//   users = _users.map(function(user) {
//     if (name === user.name) {
//       user.loginStatus = !user.loginStatus;
//     }
//       return user;
//   });
//   return users;
// }

function toggleLogin() {
  loggedIn = !loggedIn;
}

function logIn() {
  loggedIn = true;
}

function logOut() {
  loggedIn = false;
}


var AppStore = assign({}, EventEmitter.prototype, {

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
    console.log(action.item);
    var firebaseRef = firebase.database().ref('pollData').push(action.item);
    AppStore.emitChange();

  }
  return true;
});

module.exports = AppStore;
