const Joi = require('joi')
// const schema = require('./schemas')

const middleware = (schema, property) => { 
    return (req, res, next) => {
        const { error } = schema.validate(req.body, schema); 
        const valid = error == null; 

        if (valid) { 
            next(); 
        } else { 
            // const { details } = error; 
            // const message = details.map(i => i.message).join(',');

            // console.log("error", message); 
            // res.json({ error: message })
            console.log(2222222);
        } 
    } 
} 
module.exports = middleware;