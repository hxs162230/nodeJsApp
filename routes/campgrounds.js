var express 		 = require("express");
var router 			 = express.Router();
var Campground_Model = require("../models/campgrounds");
var Comment     	 = require("../models/comment");
var middleware       = require("../middleware");

router.get("/campgrounds",function(req,res){
	//get all campground from db
	//
	//show user logged in 
	//console.log(req.user);
	Campground_Model.find({},function(err,allcampground){
		if(err){
			req.flash("error",err);
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds:allcampground});
		}
	});
	
	console.log("you enter campgrounds");
});

router.post("/campgrounds",middleware.isLoggedIn ,function(req,res){
	//get data from form and add to campground array;
	var name = req.body.name;
	var imageURL = req.body.image;
	var dsc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name,image: imageURL,description:dsc,author:author};
	Campground_Model.create(newCampground,function(err,campground){
	if(err){
		req.flash("error",err);
		console.log("err ocurred");
	}
	else{
		console.log("you have insert new cp to db");
	}
});
	//redirect to campgrounds;
	res.redirect("/campgrounds");
});

router.get("/campgrounds/new",middleware.isLoggedIn ,function(req,res){
	res.render("campgrounds/new");
})


router.get("/campgrounds/:id",function(req,res){
	//find campground with provided ID
	Campground_Model.findById(req.params.id).populate("comments").exec(function(err,findCampGroundID){
		if(err){
			req.flash("error",err);
			console.log(err);
		}
		else{
			console.log(findCampGroundID);
			res.render("campgrounds/show",{campground:findCampGroundID});
		}
	});
	
});

//edit cp routes
router.get("/campgrounds/:id/edit",middleware.campgroundOwnership ,function(req,res){
	//is user login at all
		Campground_Model.findById(req.params.id,function(err,foundcampground){
			res.render("campgrounds/edit",{campground:foundcampground});	
		});
});
//update cp routes
router.put("/campgrounds/:id",middleware.campgroundOwnership ,function(req,res){
	//find and update the correct cp
	Campground_Model.findByIdAndUpdate(req.params.id,req.body.campground, function(err,updatedCampground){
		if(err){
			req.flash("error",err);
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
	//redirect somewhere
});
//destroy cp route
router.delete("/campgrounds/:id",middleware.campgroundOwnership ,function(req,res){
	Campground_Model.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error",err);
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});



module.exports = router;