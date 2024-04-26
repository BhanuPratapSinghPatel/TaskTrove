const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const ChallengesProgress = require("../models/ChallengesProgress");
const Task = require("../models/Task")
const { convertSecondsToDuration } = require("../utils/convertSeconds")
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber = "", gender = "", firstName = "", lastName = "" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id).populate("additionalDetails");
		const profileId = userDetails.additionalDetails._id;
		const profileDetails = await Profile.findById(profileId);
		// Update the profile fields

		profileDetails.dateOfBirth = dateOfBirth;
		profileDetails.about = about;
		profileDetails.contactNumber = contactNumber;
		profileDetails.gender = gender;
		// Save the updated profile
		await profileDetails.save();
		userDetails.additionalDetails.dateOfBirth = dateOfBirth;
		userDetails.additionalDetails.about = about;
		userDetails.additionalDetails.contactNumber = contactNumber;
		userDetails.additionalDetails.gender = gender;
		userDetails.firstName = firstName;
		userDetails.lastName = lastName;
		await userDetails.save();
		return res.json({
			success: true,
			message: "Profile updated successfully",
			userDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		const id = req.user.id;
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be Deleted" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
	try {
		const displayPicture = req.files.displayPicture
		const userId = req.user.id
		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log(image)
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		)
		res.send({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};

exports.getEnrolledChallenges = async (req, res) => {
	try {
		const userId = req.user.id
		const userDetails = await User.findOne({
			_id: userId,
		})
			.populate({
				path: "enrolledChallenges",
				populate: {
					path: "taskContent",
					populate: {
						path: "subSection",
					},
				},
			})
			.exec()

		const arr = []
		let c = 0;
		userDetails.enrolledChallenges.forEach((r) => {
			let totalDurationInSeconds = 0
			r.taskContent.forEach((content) => {
				content.subSection.forEach((subSection) => {
					let timeDurationInSeconds = 0
					let [numericValue, unit] = []
					if (subSection.timeDuration)
						[numericValue, unit] = subSection.timeDuration.split(' ');
					if (unit === 'min')
						timeDurationInSeconds += parseInt(numericValue, 10) * 60;
					else if (unit === 'hr')
						timeDurationInSeconds += parseInt(numericValue, 10) * 3600;
					totalDurationInSeconds += timeDurationInSeconds
				})
			})
			const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
			arr[c++] = totalDuration
		})
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userDetails}`,
			})
		}
		return res.status(200).json({
			success: true,
			data: { userDetails, arr }
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};

exports.studentDashboard = async (req, res) => {
	try {
		const taskDetails = await Task.find({ instructor: req.user.id })

		//   const taskData = taskDetails.map((task) => {
		// 	const totalStudentsEnrolled = task.studentsEnrolled.length
		// 	const totalAmountGenerated = totalStudentsEnrolled * task.price

		// Create a new object with the additional fields
		// const taskDataWithStats = {
		//   _id: task._id,
		//   taskName: task.taskName,
		//   taskDescription: task.taskDescription,
		//   // Include other course properties as needed
		//   totalStudentsEnrolled,
		//   totalAmountGenerated,
		// }

		// return taskDataWithStats
		//   })

		res.status(200).json({ taskDetails })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server Error" })
	}
}
