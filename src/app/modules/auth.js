// module.exports = {
// 	isLoggedIn : function(req,res,next) {
// 		if(req.isAuthenticated()) {
// 			return next()
// 		}else{
// 			req.flash('error','Please login first to access')
// 			res.redirect('/login')
// 		}
// 	}
// }

module.exports.isLoggedIn = function(req,res,next) {
	if(req.isAuthenticated()) {
		return next()
	}else{
		req.flash('error','Please login first to access')
		res.redirect('/login')
	}
}
