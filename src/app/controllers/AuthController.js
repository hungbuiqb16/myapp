const user = require('../../models/user')
const userActivation = require('../../models/user_activations')
const passwordReset = require('../../models/password_resets')
const bcrypt  = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const mailer = require('../helpers/mailer')
const { randomString } = require('../helpers/randomString')
const ejs = require('ejs')
const path = require('path')

class AuthController {

    //[GET] /dashboard
    dashboard(req,res) {
    	res.send('This is dashboard page')
    }


	//[GET] /register
	getRegister(req,res) {
		res.render('auths/register',{title:'Register',
									 layout:'auths/layouts',
									 msg:req.flash('message')})
	}
	//[POSS] /register
	postRegister(req,res,next) {
		const name = req.body.name
		const email = req.body.email
		const inputPassword = req.body.password
		const password = bcrypt.hashSync(inputPassword, salt)

		user.create({name:name,email:email,password:password},
			function(err,docs) {
			     userActivation.create({user_id:docs._id,confirmation_code:randomString(60),createdAt: new Date()},
			     	function(err,code) {
                        if (err) {
                        	console.log('has error');
                        }else {
                        	var emailTemplate;
                        	var link = new URL(code.confirmation_code,'http://localhost:8080/users/confirm/token/')
                        	 ejs.renderFile(path.join(__dirname,'email.ejs'),{link:link,name:name})
            	                .then((result) => {
            	                	emailTemplate = result
            	                	mailer.sendMail(email,'NitroTECH | Registration Confirmation', emailTemplate)
		                            req.flash('message','Please check your email to active this account')
		                            res.redirect('back')
            	                }).catch((err) => {
            	                	res.status(400).json({
            	                		message: 'Has error',
            	                		error: err
            	                	})
            	                })             
                        }
			})
		})     

	}

	//[GET] /users/confirm/token/:token
	confirmAccount(req,res) {
		userActivation.findOne({confirmation_code:req.params.token}).exec((err,docs) => {
			if (err) {
				console.log('token khong ton tai');
			} else {
				const userId = docs.user_id;
				user.findByIdAndUpdate(userId,{status:'1'},function(err,user) {
					if(err) throw err
					userActivation.deleteOne({user_id:user._id},function(err){
						if(err) throw err
					    console.log('Your account has been active');
					    req.flash('message','Your account has been active.')
					    res.redirect('/login')
					})
				})
			}
		})

		// userActivation.findOne({confirmation_code:req.params.token}).then((docs)=>{
		// 	const userId = docs.user_id
		// 	user.findByIdAndUpdate(userId,{status:1}).then((result)=>{
		// 		userActivation.deleteOne({user_id:result._id}).then(()=>{
		// 			req.flash('message','Your account has been active.')
		// 		    res.redirect('/login')
		// 		})
		// 	})
		// }).catch((err) => {
		// 	res.status(400).json({
		// 		message: 'Has error',
		// 		error: err
		// 	})
		// })
	}

	//[GET] /login
	getLogin(req,res) {
		res.render('auths/login',{title:'Login',layout:'auths/layouts',msg:req.flash('message'),err:req.flash('error')})
	}

	//[GET] /users/password/new
	forgotPassword(req,res) {
        res.render('auths/forgot-password',
        	{title:'Forgot password',
        	layout:'auths/layouts',
            msg:req.flash('message'),
            err:req.flash('error')
        })
	}

	//[POST] /users/password/new
	sendRequestByMail(req,res) {
		var email = req.body.email
		user.findOne({email:email},function(err,docs){
			if(docs == null) {
				req.flash('error','Mail not valid in system.')
				res.redirect('back')
			} else {
				passwordReset.create({email: email,token: randomString(60),createdAt: new Date()},function(err,pass) {
					if (err) {
						throw err
					}else{
                    	var emailTemplate;
                    	var link = new URL(pass.token,'http://localhost:8080/users/password/reset/token/')
                    	 ejs.renderFile(path.join(__dirname,'reset-password.ejs'),{link:link,name:docs.name})
        	                .then((result) => {
        	                	emailTemplate = result
        	                	mailer.sendMail(email,'NitroTECH | Recover password', emailTemplate)
		                        req.flash('message','You will receive a password recovery link at your email address in a few minutes.')
		                        res.redirect('/users/password/new')
        	                }).catch((err) => {
        	                	res.status(400).json({
        	                		message: 'Has error',
        	                		error: err
        	                	})
        	                })
					}					
				})
			}
		})
	}

	//[GET] /users/password/reset/token/:token
	checkToken(req,res) {
		const token = req.params.token
		passwordReset.findOne({token:token}, function(err,docs) {
			if(docs == null) {
				req.flash('message','Your password reset token has expired or not valid.')
				res.redirect('/404')
			}else{
				res.render('auths/recover-password',
					       {title:'Recover password',
					       layout:'auths/layouts',email:docs.email,token:token})                
			}
		})
	}

	//[POST] /users/password/reset/token/:token
	resetPassword(req,res) {
		 const password = bcrypt.hashSync(req.body.password, salt)
         user.updateOne({email:req.body.email},{password:password},function(err,docs) {
         	if (err) {
         		throw err
         	}else{  		
         		passwordReset.deleteOne({token:req.params.token}, function(err,pas) {
         			if (err) throw err
	          		req.flash('message','Changed password successfully!')
	         		res.redirect('/login')        				
         		})
         	}
         })
	}

	//[POST] /login
	postLogin(req,res) {
		const email = req.body.email //get email on input
		const pass  = req.body.password //get password on input
		user.findOne({email:email}).then((docs)=>{
			const dbPass = docs.password //get password in database
			if(bcrypt.compareSync(pass, dbPass)) {
				req.flash('success','You successfully logged in to this website.')
				res.redirect('/')
			}else{
				req.flash('error','Email or password not valid')
				res.redirect('back')
			}
		}).catch((err)=>{
				req.flash('error','Email or password not valid')
				res.redirect('back')
		})
	}

	//[GET] /logout
	logout(req,res) {
		req.logout()
		res.redirect('/')
	}

}

module.exports = new AuthController