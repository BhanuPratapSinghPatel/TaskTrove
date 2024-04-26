const mongoose=require("mongoose");

const ratingAndReviewSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    task: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Task",
		index: true,
	},

});

module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);