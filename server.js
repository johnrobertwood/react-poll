var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'js')));

app.get('*', function(req, res) {
  console.log(req.connection.remoteAddress);
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(8080, function() {
	console.log("Server on port 3000");
});