const mongoose = require("mongoose");

// Define the Courses schema
const TaskSchema = new mongoose.Schema({
	taskName: { type: String },
	taskDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	whatYouWillLearn: {
		type: String,
	},
	taskContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	// price: {
	// 	type: Number,
	// },
	// thumbnail: {
	// 	type: String,
	// },
	// tag: {
	// 	type: [String],
	// 	required: true,
	// },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	// instructions: {
	// 	type: [String],
	// },
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Export the Courses model
module.exports = mongoose.model("Task", TaskSchema);