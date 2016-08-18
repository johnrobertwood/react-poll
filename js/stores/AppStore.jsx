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

var firebaseRef = firebase.database().ref('pollData');

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

function addPoll(title, text, user) {

  var choices = text.split(',').map(function(item) {return [item];});
  var colors = choices.map(function() {
    return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
      return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
  })
  var initialData = choices.map(function(item) {return 0;});
  var pieData = text.split(',').map(function(item) {
    var obj = {}
    obj.label = item;
    obj.color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
      return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
    obj.value = 0;
    return obj;
  })

  var poll = [pieData, user, title];

  firebaseRef.push(poll, function() {
    AppStore.emitChange();
  });
}

function getPoll(key) {
  polls = [];
  firebaseRef.once('value', function(snapshot) {
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
  firebaseRef.once('value', function(snapshot) {
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
  firebaseRef.once('value', function(snapshot) {
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
  firebaseRef.child(key).remove()
  userPolls = userPolls.filter(function(poll) {
    return poll['.key'] !== key;
  })
  hideModal();
  AppStore.emitChange();
  resetModal();
}

function newOption(key, option) {
  var obj = {};
  var arr = [];
  obj.label = option;
  obj.color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
      return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
  obj.value = 1;
  poll[0][0].push(obj)
  firebaseRef.child(key).update({0: poll[0][0]}, function() {
    AppStore.emitChange();
  });
}

function addVote(key, selection, user) {
  var length = poll[0][0].length;
  var dataArr = poll[0];
  for (var i = 0; i < length; i++) {
    if (dataArr[0][i].label === selection) {
      poll[0][0][i].value += 1;
    }
  }
  firebaseRef.child(key).update({0: poll[0][0]});
  AppStore.emitChange();
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

  if (action.actionType === "LOG_IN") {
    loggedIn = true;
    AppStore.emitChange();
  }

  if (action.actionType === "LOG_OUT") {
    loggedIn = false;
    AppStore.emitChange();
  }

  if (action.actionType === "ADD_POLL") {
    addPoll(action.title, action.text, action.user);
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

  if (action.actionType === "ADD_VOTE") {
    addVote(action.key, action.selection, action.user);
  }
  
  return true;
});

module.exports = AppStore;




