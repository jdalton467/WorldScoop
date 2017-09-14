
//loading the dependencies that we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

///define a schema for our user model
var userSchema = mongoose.Schema({
    username: String,
    password: String,
});


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