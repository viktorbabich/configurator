const mongoose = require('mongoose'),
		  Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
	},
  owner: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'User' 
  },
  created: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
  },
  user: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'User' 
  },
});

schema.pre('save', function(next) {
	if(this.update !== this.created ) {
		this.update = Date.now();
	}
  next();
});

exports.Project = Project = mongoose.model('Project', schema);