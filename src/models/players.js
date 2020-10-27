const mongoose = require('mongoose')
const Schema  = mongoose.Schema

let playerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	nation: {
		type: String,
		required: true
	},
	birthday: {
		type: Date,
		required: true
	},
	// avatar: {
 //       type: String,
 //       required: false
	// }
})

module.exports = mongoose.model('player',playerSchema)