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

var alreadyVoted = false;

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

  var poll = {data: pieData, user: user, title: title};

  firebaseRef.push(poll, function() {
    AppStore.emitChange();
  });
}

function getPoll(key, user) {
  polls = [];
  alreadyVoted = false;
  firebaseRef.once('value', function(snapshot) {
    var obj = snapshot.val();

    for (var prop in obj) {
      obj[prop][".key"] = prop;
      polls = polls.concat(obj[prop])
    }

    poll = polls.filter(function(poll) {
      return poll[".key"] === key;
    })

    if (poll[0].voters) {
      poll[0].voters.forEach(function(voter) {
        if (user === voter) {
          alreadyVoted = true;
        }
      });
    }

    AppStore.emitChange();
    return poll;
  })
}

function getAllPolls() {
  polls = [];

  firebaseRef.once('value', function(snapshot) {
    var obj = snapshot.val();

    for (var prop in obj) {
      obj[prop][".key"] = prop;
      polls = polls.concat(obj[prop])
    }

    AppStore.emitChange();
    return polls;
  })
}

function getUserPolls(user) {
  userPolls = [];

  firebaseRef.once('value', function(snapshot) {
    var obj = snapshot.val();

    for (var prop in obj) {
      obj[prop][".key"] = prop;
      userPolls = userPolls.concat(obj[prop])
    }

    userPolls = userPolls.filter(function(poll) {
      return poll.user === user;
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

function newOption(key, option, user) {
  var arr = [];
  var voters = poll[0].voters || [];
  var obj = {};
  obj.label = option;
  obj.color = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
      return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
  obj.value = 1;
  poll[0].data.push(obj)

  if (!checkVoters(voters, user)) {
    voters.push(user);
  }

  alreadyVoted = true;

  firebaseRef.child(key).update({data: poll[0].data}, function() {
    AppStore.emitChange();
  });
}

function checkVoters(arr, voter) {
  return arr.some(function(arrVal) {
    return voter === arrVal
  });
}

function addVote(key, selection, user) {
  var length = poll[0].data.length;
  var dataArr = poll[0].data;
  var voters = poll[0].voters || [];

  if (!checkVoters(voters, user)) {
    voters.push(user);
  }

  alreadyVoted = true;

  for (var i = 0; i < length; i++) {
    if (dataArr[i].label === selection) {
      poll[0].data[i].value += 1;
    }
  }
  firebaseRef.child(key).update({data: poll[0].data, voters: voters});
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
  },

  getVotedStatus: function() {
    return alreadyVoted;
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
    getPoll(action.key, action.user);
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
    newOption(action.key, action.option, action.user);
  }

  if (action.actionType === "ADD_VOTE") {
    addVote(action.key, action.selection, action.user);
  }
  
  return true;
});

module.exports = AppStore;




