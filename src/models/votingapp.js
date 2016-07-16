var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	name: String,
	options: Array
})

module.exports = mongoose.model('poll', pollSchema);