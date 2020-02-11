var Campground_Model = require("../models/campgrounds");
var Comment 		 = require("../models/comment");
// alll mw goes here
var middlewareObj = {
};

middlewareObj.campgroundOwnership = function campgroundOwnership(req,res,next){
		if(req.isAuthenticated()){
		Campground_Model.findById(req.params.id,function(err,foundcampground){
			if(err){
				req.flash("error","campground not found");
				res.redirect("back");
			}
			else{
				//does user owns cp
				if(foundcampground.author.id.equals(req.user._id)){ //compare not string and mongoObject
					next();
					//res.render("campgrounds/edit",{campground:foundcampground});
				}
				else{
					req.flash("error","You have no permission to do that");
					res.redirect("back");
				}
				
			}
		});
	}
	else{
		req.flash("error","You need to be log in");
		console.log("you need to be login");
		res.redirect("back");
	}
};

middlewareObj.commentOwnership = function commentOwnership(req,res,next){
		if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
			if(err){
				res.redirect("back");
			}
			else{
				//does user owns comment
				if(foundComment.author.id.equals(req.user._id)){ //compare not string and mongoObject
					next();
					//res.render("campgrounds/edit",{campground:foundcampground});
				}
				else{
					
					res.redirect("back");
				}
			}
		});
	}
	else{
		console.log("you need to be login");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		req.flash("error","Please Log In First"); //do it before redirect
		res.redirect("/login");
	}
};

module.exports = middlewareObj;