var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var Poll = require('./src/models/votingapp')
var bodyParser = require('body-parser');

mongoose.connect('mongodb://'+process.env.USER+':'+process.env.MONGO_PW+'@ds023245.mlab.com:23245/votingapp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'build')));


// app.get('/newpoll', function (req, res) {
// 	console.log('newpoll get path')
// 	var output = {};
// 	var poll = new Poll();

// 	poll.name = "test";
// 	poll.options = [1, 2, 3];

// 	output.name = poll.name;
// 	output.options = poll.options;
// 	poll.save(function(err, data) {
// 		if (err) return console.error(err);
// 	});
// 	res.json(output);
// });

app.post('/newpoll', function(req, res) {
	var poll = new Poll();
	poll.name = req.body.name;
	poll.save(function(err, data) {
		if (err) return console.error(err);
	});
	res.json(output);
})

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.listen(3000, function() {
	console.log("Server on port 3000");
});