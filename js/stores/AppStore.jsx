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

function addPoll(poll) {
  firebase.database().ref('pollData').push(poll, function() {
    AppStore.emitChange();
  });
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

function newOption(key, option) {
  var firebaseRef = firebase.database().ref('pollData');

  var obj = {}
  obj.label = option;
  obj.color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
      return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
  obj.value = 0;
  var firebaseRef = firebase.database().ref('pollData').child(key);
  firebaseRef.once('value', function(snap) {
    var arr = snap.val();
    arr[0].push(obj);
    poll[0][0].push(obj)
    firebaseRef.set(arr, function() {
      legend = 'newChart';
      AppStore.emitChange();
    });
  });

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

  if (action.actionType === "ADD_POLL") {
    addPoll(action.poll);
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
  }

  if (action.actionType === "NEW_OPTION") {
    newOption(action.key, action.option);
  }
  
  return true;
});

module.exports = AppStore;




