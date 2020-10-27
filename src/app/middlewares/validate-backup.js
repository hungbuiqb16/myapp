
module.exports.clubCreate = function(req,res,nex) {
	var errors = [];

	if (!req.body.name) {
		errors.push('Club name is required');
	}

	if (!req.body.stadium) {
		errors.push('Stadium name is required');
	}

	if (!req.body.nation) {
		errors.push('Coach name is required');
	}

	if (errors.length) {
		console.log(errors);
		res.render('/clubs/add',{
			errors: errors,
			value: req.body
		});
		return;
	}
	next();
}