const passport         = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const db               = require('../../models/user')

let innitPassportFb = () => {
	passport.use(new FacebookStrategy({
        clientID: 980372629096781,
        clientSecret: '0786abfe5f7eed26edfb0b9a13292410',
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['email','gender','locale','displayName']
	},(accessToken,refreshToken,profile,done) => {
		console.log(profile);
		db.findOne({facebookId: profile._json.id},(err,user) => {
			if(err) return done(err)
			if(user) return done(null,user)
			const newUser = new db({
				facebookId: profile._json.id,
				name: profile._json.name,
				email: profile._json.email
			})
		    newUser.save((err) => {
		    	return done(null,newUser)
		    })
		})
	}))
}

passport.serializeUser(function(profile, done) {
    done(null, profile.id);
})
//get info in cookie
passport.deserializeUser(function(id, done) {
    db.findOne({facebookId:id}, function(err, user) {
       if(err) return done(null)
       return done(null,user)
    });
});

module.exports = innitPassportFb

