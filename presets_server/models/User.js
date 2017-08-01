const mongoose = require('mongoose'),
		  Schema = mongoose.Schema,
		  async = require('async');

const schema = new Schema({
	name: {
		type: String,
	},
	googleID: {
		type: String
	},
	email: {
		type: String
	},
  avatar: {
    type: String,
    default: '/uploads/defaultuser.jpg'
  },
	created: {
	  type: Date,
	  default: Date.now
	}
});

schema.statics.findOrCreate = function (userObj, callback) {
	const User = this;

	async.waterfall([
	  done => {
	    User.findOne({ googleID: userObj.googleID },  (err, user) => {
	      done(null, user);
	    });
	  },
	  (user, done) => {
	  	if (user) {
	  	  done(null, user);
	  	} else {
	  		const newUser =  new User(userObj);

	  		newUser.save( err => {
	  			console.log("err: ", err);
	  			done(null, newUser);
	  		})
	  	}
	  }], callback)
}


exports.User = User = mongoose.model('User', schema);