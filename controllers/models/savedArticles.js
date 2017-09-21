
var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	url: String
})


//model for saving articles that people would want to come back to later
module.exports = mongoose.model('Article', articleSchema);