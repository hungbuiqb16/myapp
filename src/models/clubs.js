const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ClubShema = new Schema({
	name: {
		type: String,
		minlength: 5,
		maxlength: 50,
		required: true
	},
	stadium: {
		type: String,
		required: true
	},
	coach: {
		type: String,
		required: true
	},
	logo: {
       type: String,
       required: false
	}
})

module.exports = mongoose.model('club',ClubShema)
