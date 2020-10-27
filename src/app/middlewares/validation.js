const Joi = require('joi')

const addClubValidation = function(data) {
   const schema = Joi.object( {
	    name: Joi.string().required(), 
	    stadium: Joi.string().required(), 
	    coach: Joi.string().required() 
   })
   return schema.validate(data)
}

module.exports.addClubValidation = addClubValidation