const express                     = require('express')
const router                      = express.Router()
const clubController              = require('../app/controllers/ClubController')
const upload                      = require('../app/middlewares/upload')
const { check, validationResult } = require('express-validator')
const club = require('../models/clubs')

//ROUTE FOR LIST
router.get('/clubs',clubController.dashboard)
router.get('/',clubController.index)
//ROUTE FOR CREATE
router.get('/clubs/add',clubController.getAdd)
// router.post('/clubs', upload.single('logo'),clubController.store)

router.post('/clubs', upload.single('logo'),[
		check('name','Club name is not empty').not().isEmpty(),
		check('name','Club name more than 5 digits').isLength({min:5}),
		check('stadium','Stadium name is not empty').not().isEmpty(),
		check('stadium','Stadium name more than 5 digits').isLength({min:5}),
		check('coach','Coach name is not empty').not().isEmpty(),
		check('coach','Coach name more than 5 digits').isLength({min:2}),
	],(req,res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const errMessage = errors.array()
	        res.render('clubs/add',{errMessage})
        }
        const logo    = req.file.filename
		const name    = req.body.name
		const stadium = req.body.stadium
		const coach   = req.body.coach   

        const items = new club({
	       	name,
	       	stadium,
	       	coach,
            logo
        })
        items.save((err) => {
            if(err) console.log(err.errors)
    		club.find((err,clubs) => {
    			res.render('clubs/page',{clubs:clubs,layout:false})
    		})           
       })
	})

//ROUTE FOR DELETE
router.get('/clubs/delete/:id',clubController.delete)
//ROUTE FOR SEARCH
router.post('/clubs/search',clubController.search)

module.exports = router