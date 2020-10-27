const mongoose = require('mongoose')
const Schema = mongoose.Schema

let passwordReset = new Schema({
	email: {
		type: String,
		required: true
	},
	token: {
		type: String,
		require: true
	},
	createdAt: {
		type: Date,
		expires: 1800
	}
})


module.exports = mongoose.model('password_reset',passwordReset)