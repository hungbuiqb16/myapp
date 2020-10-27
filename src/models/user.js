const mongoose = require('mongoose')

const Schema  = mongoose.Schema

let userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: false
	},
	status: {
		type: Boolean,
		default: 0
	},
	facebookId: {
		type: String,
		required: false
	},
	googleId: {
		type:String,
		required: false
	}
})

module.exports = mongoose.model('user',userSchema);