const multer  = require('multer')
const storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'src/public/uploads')
	  },
	  filename: function (req, file, cb) {
	    cb(null, file.fieldname + '-' + Date.now())
	  },
	  encoding: function(req, file, cb) {

	  }
})
const upload = multer({ storage: storage })

module.exports = upload

