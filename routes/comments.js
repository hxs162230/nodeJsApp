var express 		 = require("express");
var router 			 = express.Router();
var Campground_Model = require("../models/campgrounds");
var Comment     	 = require("../models/comment")
var middleware       = require("../middleware");

//============================
//comment routes
//============================

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn ,function(req,res){

	Campground_Model.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error",err);
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground});
		}
	})
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn ,function(req,res){
	//looking cp using ID
	Campground_Model.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error",err);
			console.log(err);
			res.redirect("/campgrounds")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","something went wrong");
					console.log(err);
				}
				else{
					//add username and id to comment
					//stats login fetch => user data
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//save comment
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			})
		}
	});
	//create new comment
	//connect new comment to cp
	//redirected
});

router.get("/campgrounds/:id/comments/:comment_id/edit",function(req,res){
	//req.params.id //campground id
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error",err);
			res.redirect("back");
		}
		else{
			res.render("comments/edit", {campground_id:req.params.id,comment:foundComment});
		}
	})
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.commentOwnership ,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,function(err,updatedComment){
		if(err){
			req.flash("error",err);
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//comment destroy routes
router.delete("/campgrounds/:id/comments/:comment_id",middleware.commentOwnership , function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error",err);
			res.redirect("back");
		}
		else{
			req.flash("seccess","comment delete");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});




module.exports = router;