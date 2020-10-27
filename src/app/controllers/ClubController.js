const club = require('../../models/clubs')
const fs   = require('fs')

class ClubController
{
	//[GET] /clubs
    dashboard(req,res) {
    	club.find((err,docs) => {
    		res.render('clubs/list',{clubs:docs,msg:req.flash('success')})
    	}).catch(err => {
    		console.log('Something went wrong to read data to database');
    	})
    	
    }
    
    index(req,res) {
    	res.redirect('/clubs')
    }
    //[GET] /clubs/add
    getAdd(req,res) {
    	res.render('clubs/add')
    }
    //[POST] /clubs
    store(req,res) {
        console.log(req.file);
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
    }

    //[GET] /clubs/delete/:id
    delete(req,res,next) {
    	club.findByIdAndDelete({_id:req.params.id}).exec((err,docs) => {
    		club.find((err,clubs) => {
    			//console.log(clubs);
    			res.render('clubs/page',{clubs:clubs,layout:false})
    		})
    	})
    }

    //[POST] /clubs/search
    search(req,res,next) {
    	const keyword = req.body.keyword
    	club.find({$or:[{name:{$regex:keyword, $options:'i'}},
			    		{stadium:{$regex:keyword, $options:'i'}},
			    		{coach:{$regex:keyword, $options:'i'}}]})
    	    .exec((err,docs) => {
    	    	club.countDocuments().exec((err,count) => {
        			// if(count > 0) res.render('clubs/page',{clubs:docs,layout:false})
    			    // res.send('<tr>No data</tr>')
    			    if (err) {
    			    	return next(err)
    			    }else if(count > 0){
    			    	res.render('clubs/page',{clubs:docs,layout:false})
    			    }else{
    			    	
    			    	data = res.send('<tr>No data</tr>')

    			    }
	    		
    	    	})
    		})
    }
    //[GET] /clubs/edit/id
    edit(req,res) {
        const id = req.params.id
        club.findById(id).exec((err,docs) => {
            res.json({ clubs: docs })
        })
    }

    //[POST] /clubs/update
    update(req,res) {
        const logo    = req.file.filename
        const name    = req.body.name
        const stadium = req.body.stadium
        const coach   = req.body.coach
        
        club.findByIdAndUpdate(req.params.id,
                {name:name,stadium:stadium,coach:coach,logo:logo},false,function(err,clubs){
                    const path = 'src/public/uploads/' + clubs.logo;
                    fs.unlink(path,function(err) {
                        if(err) throw err
                        console.log('Old file has deleted!');
                    });
                })
            .exec((err,docs) => {
                club.find((err,clubs) => {
                  res.render('clubs/page',{clubs:clubs,layout:false})
                })
        })
    }


}

module.exports = new ClubController