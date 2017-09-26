var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var articleSchema = mongoose.Schema({
    
    article:{
    	type:String
    }
});


module.exports = mongoose.model('Article', articleSchema);