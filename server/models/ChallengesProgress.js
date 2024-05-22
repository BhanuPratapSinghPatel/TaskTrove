const mongoose = require("mongoose");

const ChallengesProgress = new mongoose.Schema({

	challengeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Task",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	  },
	completedSubsection: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubSection",
		},
	],
});

module.exports = mongoose.model("ChallengesProgress", ChallengesProgress);