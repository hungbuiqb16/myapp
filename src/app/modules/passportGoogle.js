const passport       = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db             = require('../../models/user')

let initPassportGoogle = () => {
	passport.use(new GoogleStrategy({
	    clientID: '730114175813-9hrq66pqkahes3bq2fq94e56m26pcmu2.apps.googleusercontent.com',
	    clientSecret: 'qNmOVLZozJrWl1-xj-KgWfYI',
	    callbackURL: "http://localhost:8000/auth/google/callback",
	    profileFields: ['profile','email']
	  },
	    function(accessToken, refreshToken, profile, cb) {
	        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
	        //     return cb(err, user);
	        // })
	        console.log(profile);
	    }
	))

passport.serializeUser(function(profile, done) {
    done(null, profile);
})
// //get info in cookie
// passport.deserializeUser(function(id, done) {
//     db.findOne({facebookId:id}, function(err, user) {
//        if(err) return done(null)
//        return done(null,user)
//     });
// });

}

module.exports = initPassportGoogle