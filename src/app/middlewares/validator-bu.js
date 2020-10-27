const { check, validationResult } = require('express-validator')


module.exports.validateClub = function(req,res,next) {

	var msg = [
		check('name','Club name is not empty').not().isEmpty(),
		check('name','Club name more than 5 digits').isLength({min:5}),
		check('stadium','Stadium name is not empty').not().isEmpty(),
		check('stadium','Stadium name more than 5 digits').isLength({min:5}),
		check('coach','Coach name is not empty').not().isEmpty(),
		check('coach','Coach name more than 5 digits').isLength({min:2}),
	];
	var errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errMessage = errors.array()
        res.render('clubs/add',{errMessage})
    }
    next();
}