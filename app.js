var express  		 = require("express");
var app 			 = express();
var bodyParser 		 = require("body-parser");
var mongoose 		 = require("mongoose");
var flash            = require("connect-flash");
var Campground_Model = require("./models/campgrounds");
var Comment     	 = require("./models/comment")
var seedDB 			 = require("./seed.js");

//require routes
var commentRoutes 	 = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes 	 = require("./routes/index");


var passport 		 = require("passport");
var LocalStrategy    = require("passport-local");
var User  			 = require("./models/user");

var methodOverride   = require("method-override");
//seedDB();  //seed the databases
app.use(methodOverride("_method"));

app.use(flash());

//default port 27017
//mongoose.connect("mongodb://localhost:27017/yelp_camp_te",{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connect("mongodb+srv://ivan:12345@yelpcamp-4gjvq.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true });
//mongodb+srv://ivan:12345@yelpcamp-4gjvq.mongodb.net/test?retryWrites=true&w=majority


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");



var port = process.env.PORT || 3000;

//PASSPORT CONFIGs
app.use(require("express-session")({
	secret: "Ivan Su loves Lulu",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//no need of adding current user to all routes
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(port, process.env.IP, function(){
	console.log("start program");
});