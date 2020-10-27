const Joi = require('joi') 

const schemas = { 
    clubADD: Joi.object().keys({ 
	    name: Joi.string().required(), 
	    stadium: Joi.string().required(), 
	    coach: Joi.string().required() 
    }) 
};

module.exports = schemas;