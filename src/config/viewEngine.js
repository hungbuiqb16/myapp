const express = require('express')

let viewEngine = (app) => {
	app.set('view engine','ejs')
	app.set('views','./src/resources/views')
	app.use(express.static('src/public'))
}

module.exports = viewEngine