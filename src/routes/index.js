const clubRouter   = require('./club')
const playerRouter = require('./player')
const userRouter   = require('./user')

function route(app)
{
	app.use('/',clubRouter)
	app.use('/',playerRouter)
	app.use('/',userRouter)
	app.get('/404',(req,res) => {
		res.send('error page')
	})
}

module.exports = route