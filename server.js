var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'js')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, function() {
	console.log("Server on port 3000");
});