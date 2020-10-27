const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userActivation = new Schema({
    user_id: {
    	type: String,
    	required: false
    },
    confirmation_code: {
    	type: String,
    	required: false
    },
    createdAt: {
    	type: Date,
    	expires: 1800
    }
})

module.exports = mongoose.model('user_activations',userActivation)