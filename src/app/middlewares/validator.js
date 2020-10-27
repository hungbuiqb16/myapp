const joi = require('joi')

const validator = { 
  clubADD: joi.object().keys({ 
    name: joi.string().required(), 
    stadium: joi.string().required(), 
    coach: joi.number() }), 
  clubSLUG: { 
   id: joi.number().min(1).required() 
  } 
} 
module.exports = validator