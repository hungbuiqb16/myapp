const express          = require('express')
const router           = express.Router()
const authController   = require('../app/controllers/AuthController')
const passport         = require('passport')
const bcrypt           = require('bcryptjs')
const { isLoggedIn }   = require('../app/modules/auth')
const passportLocal    = require('../app/modules/passportLocal')
const passportFacebook = require('../app/modules/passportFb')
const passportGoogle   = require('../app/modules/passportGoogle')

passportLocal()
passportFacebook()
passportGoogle()

//ROUTE FOR REGISTER
router.get('/register',authController.getRegister)
router.post('/register',authController.postRegister)

router.get('/dashboard',isLoggedIn,authController.dashboard)

//ROUTE FOR ACTIVE ACCOUNT
router.get('/users/confirm/token/:token',authController.confirmAccount)

//ROUTE FOR LOGIN
router.get('/login',authController.getLogin)
router.post('/login',
	passport.authenticate('local',{failureRedirect: '/login',successRedirect: '/'}))

//ROUTE FOR FORGOT PASSWORD
router.get('/users/password/new',authController.forgotPassword)
router.post('/users/password/new',authController.sendRequestByMail)
router.get('/users/password/reset/token/:token',authController.checkToken)
router.post('/users/password/reset/token/:token',authController.resetPassword)

//ROUTE FOR LOGOUT
router.get('/logout',authController.logout)

//ROUTE FOR LOGIN WITH FACEBOOK
router.get('/auth/facebook',
	passport.authenticate('facebook',{ scope: ['email'] }))
router.get('/auth/facebook/callback',
	passport.authenticate('facebook',{failureRedirect: '/login',successRedirect: '/'}))


//ROUTE FOR LOGIN WITH GOOGLE
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }))
router.get('/auth/google/callback',
	passport.authenticate('google',{ failureRedirect: '/login',successRedirect: '/'}))

module.exports = router