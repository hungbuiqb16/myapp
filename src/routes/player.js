const express          = require('express')
const router           = express.Router()
const playerController = require('../app/controllers/PlayerController')
const { check, validationResult } = require('express-validator')


const ejs = require('ejs')
const path = require('path')
//ROUTE FOR GET
router.get('/players',playerController.index)
//ROUTE FOR ADD
router.get('/players/add',playerController.getAdd)
// router.post('/players',playerController.store)

// router.post('/players',[
// 	//validations..
// 	check('name','Club name is not empty').not().isEmpty()
// 	],(req,res) => {
//     //handle request
//     const errors = validationResult.(req)
//     if (!errors.isEmpty()) {
//     	res.status(422).json(errors: errors.array())
//     }
// 	})

router.post('/players',[
		check('name','The player name is not empty').not().isEmpty(),
		check('nation','The nation name is not empty').not().isEmpty()],(req,res)=>{	
			const users = {
			    name : req.body.name,
			    nation: req.body.nation
			}
			
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
	            //return res.status(411).json(errors.array())
	            const errMessage = errors.array()
	            res.render('players/demo',{errMessage,users:users})
	            
			} else {
				console.log(req.body);
				res.send('dang ky thanh cong!')
			}
		})


router.get('/mail',(req,res) => {
	let emailTemplate;
	let name = 'Hung';
	let email = 'hungbuiqb16@gmail.com';
    
    ejs.renderFile(path.join(__dirname,'test.ejs'),{name:name,email:email})
       .then((result) => {
       	emailTemplate = result;
       	res.send(emailTemplate)
       })
       .catch((err)=> {
       	res.status(400).json({
       		message: 'Has error',
       		error: err
       	});
       });

})
module.exports = router
