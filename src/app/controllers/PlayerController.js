const player = require('../../models/players')


class PlayerController
{
    //[GET] /players
    index(req,res) {
   	    res.render('players/list')
   	}
   	//[GET] /players/add
   	getAdd(req,res) {
   		res.render('players/demo')
   	}
   	//[POST] /players
   	// store(req,res) {
    //     // const name = req.body.name
    //     // const nation = req.body.nation
    //     // const birthday = req.body.birthday

    //     console.log(req.body);

   	// } 
}

module.exports = new PlayerController