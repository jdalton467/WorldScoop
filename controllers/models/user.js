
//loading the dependencies that we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
///define a schema for our user model
var userSchema = mongoose.Schema({
	local: {
    email: String,
    password: String,
}
	// articles:[{
		// type: Schema.Types.ObjectId, 
		// ref: 'Article'}]
});


var articleSchema = mongoose.Schema({
	url: String
})
//generating a has
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking is password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('Article', articleSchema);