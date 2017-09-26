var mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;


var articleSchema = mongoose.Schema({
    
    article:{
    	type: mongoose.SchemaTypes.Url
    }
});


module.exports = mongoose.model('Article', articleSchema);