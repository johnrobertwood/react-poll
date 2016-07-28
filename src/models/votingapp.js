var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	name: String
})

module.exports = mongoose.model('poll', pollSchema);