var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

app.listen(3000, function() {
	console.log("Server on port 3000");
});