const express                     = require('express')
const router                      = express.Router()
const clubController              = require('../app/controllers/ClubController')
const upload                      = require('../app/middlewares/upload')
// const { check, validationResult } = require('express-validator')
// const validate                    = require('../app/middlewares/validate-backup')
// const schemas                     = require('../app/middlewares/schemas')
// const middleware                  = require('../app/middlewares/middleware')
const Joi                         = require('joi')
const cors                        = require('cors')
const { isLoggedIn }              = require('../app/modules/auth')
const {addClubValidation}         = require('../app/middlewares/validation')

//ROUTE FOR LIST
router.get('/clubs',isLoggedIn,clubController.dashboard)
router.get('/',isLoggedIn,clubController.index)
//ROUTE FOR CREATE
router.get('/clubs/add',clubController.getAdd)
router.post('/clubs',upload.single('logo'),clubController.store)

//ROUTE FOR DELETE
router.get('/clubs/delete/:id',clubController.delete)
//ROUTE FOR SEARCH
router.post('/clubs/search',clubController.search)

//ROUTE FOR EDIT
router.get('/clubs/edit/:id',clubController.edit)
router.post('/clubs/update/:id',upload.single('logo'),clubController.update)

// router.post('/clubs', async (req,res) => {
//     const{ error } = addClubValidation(req.body);
//     if(error) return console.log(error)
// })

module.exports = router