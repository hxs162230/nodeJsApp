var mongoose = require("mongoose");
var Campground_Model = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
	{
		name:"Mountains",
		image:"https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1140&q=80",
		description:"More than a decade into his career as an organic chemist, Jon Antilla found a solution to the grinding task of fund-raising that, increasingly, was squeezing out his time in the laboratory. Leaving a tenured position at the University of South Florida, he relocated to Tianjin University in China, where he was awarded a grant through a Chinese recruitment program, Thousand Talents. He wasn’t alone: Colleagues in Tianjin’s chemistry department had given up tenured positions at the University of California, San Diego, and Texas A&M, among other prestigious institutions, attracted by China’s readily available funding."
	},
	{
		name:"Water",
		image:"https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1140&q=80",
		description:"More than a decade into his career as an organic chemist, Jon Antilla found a solution to the grinding task of fund-raising that, increasingly, was squeezing out his time in the laboratory. Leaving a tenured position at the University of South Florida, he relocated to Tianjin University in China, where he was awarded a grant through a Chinese recruitment program, Thousand Talents. He wasn’t alone: Colleagues in Tianjin’s chemistry department had given up tenured positions at the University of California, San Diego, and Texas A&M, among other prestigious institutions, attracted by China’s readily available funding."

	},
	{
		name:"Heat",
		image:"https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1140&q=80",
		description:"More than a decade into his career as an organic chemist, Jon Antilla found a solution to the grinding task of fund-raising that, increasingly, was squeezing out his time in the laboratory. Leaving a tenured position at the University of South Florida, he relocated to Tianjin University in China, where he was awarded a grant through a Chinese recruitment program, Thousand Talents. He wasn’t alone: Colleagues in Tianjin’s chemistry department had given up tenured positions at the University of California, San Diego, and Texas A&M, among other prestigious institutions, attracted by China’s readily available funding."

	}

];

function seedDB(){
	//remove all cp
	Comment.deleteMany({},function(){
		Campground_Model.deleteMany({},function(err){
	// if(err) console.log('err');
	// else console.log('you remove cp');
	// //add new few cps
	// data.forEach(function(seed){
	// 	Campground_Model.create(seed,function(err,campground){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			console.log("add a cp");
	// 			//create a comment
	// 			Comment.create({
	// 				text:"good place visit" ,
	// 				author:"Alex"

	// 			},function(err,newComment){
	// 				if(err){
	// 					console.log(err);
	// 				}
	// 				else{
	// 					campground.comments.push(newComment);
	// 					campground.save();
	// 					console.log("reeat new comment");
	// 				}
	// 			})
	// 		}
	// 	})
	// })
	});
	}
	)
	

	//add contents
};


module.exports = seedDB;