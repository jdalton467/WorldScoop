var mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;


var articleSchema = mongoose.Schema({
    
    article:{
    	type: mongoose.SchemaTypes.Url
    },
    user: {
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    }
});


module.exports = mongoose.model('Article', articleSchema);