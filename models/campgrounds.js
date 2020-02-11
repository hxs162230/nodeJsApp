var mongoose 	= require("mongoose");


//Schema setup
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"   //Model name
      }
   ]
});

var Campground_Model = mongoose.model("Campground", campgroundSchema);
module.exports = Campground_Model;
