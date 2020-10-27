const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const user          = require('../../models/user')
const bcrypt        = require('bcryptjs')

let initPassportLocal = () => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallBack: true,
		failureFlash: true 
	}, async (email,password,done) => {
		try {
			await user.findOne({email:email}, (err,user) => {
				if(err) { return done(err) }
				if(!user) { return done(null, false, {message: 'Incorrect email'}) }
				if (!bcrypt.compareSync(password,user.password)) {
			        return done(null,false, {message: 'Incorrect password'})
		        }
				if (bcrypt.compareSync(password,user.password) && user.status == false) {
			        return done(null,false, {message: 'Your account not active'})
		        }
		        return done(null,user)
			})

		} catch(e) {
            console.log(e)
            return done(null,false)
		}
	}))
}

passport.serializeUser(function(user, done) {
    done(null, user.email, user.name);
})
//get info in cookie
passport.deserializeUser(function(email, done) {
    user.findOne({email:email}, function(err, user) {
       if(err) return done(null)
       return done(null,user)
    });
});

module.exports = initPassportLocal
