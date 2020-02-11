var express 		 = require("express");
var router 			 = express.Router();
var passport 		 = require("passport");
var User  			 = require("../models/user");
var middleware       = require("../middleware");
//console.log(THREE);

router.get("/", function(req, res){
	res.render("landing");
});

//======================
//auth ROUTES


//show register form
router.get("/register",function(req,res){
	res.render("register");
});


//handle register post
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			console.log(err);
			return res.render("register");
		}
			passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");	
		});
	});
});
//show login form
router.get("/login",function(req,res){
	res.render("login");
});
//handling login
router.post("/login", passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	console.log("test1");
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Log you out");
	res.redirect("/campgrounds");
});




module.exports = router;