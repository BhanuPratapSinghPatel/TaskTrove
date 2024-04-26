const Task = require("../models/Task");//challenge,tags also kya task ke jagah task hoga ya challenegs
const Section = require("../models/Section");
const ChallengesProgress = require("../models/ChallengesProgress")
const SubSection = require("../models/SubSection")
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/convertSeconds");
// Function to create a new task


//createchallenge
exports.createTask = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			taskName,//challenge name
			taskDescription,//chalenge description optional
			whatYouWillLearn,//can be used when predefined

			// tag: _tag,
			category,
			status

		} = req.body;

		// Get thumbnail image from request files
		// const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!taskName ||
			!taskDescription ||
			!whatYouWillLearn ||

			// !_tag ||

			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		//Check if the user is an instructor
		const userDetails = await User.findById(userId, {
			accountType: "Student",
		});

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "Student Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		// const thumbnailImage = await uploadImageToCloudinary(
		// 	thumbnail,
		// 	process.env.FOLDER_NAME
		// );
		// console.log(thumbnailImage);
		// Create a new task with the given details
		const newTask = await Task.create({
			taskName,
			taskDescription,
			//yaha change keye check krna hoga ye koi problem nhi krega to
			instructor: userDetails._id,
			whatYouWillLearn: whatYouWillLearn,

			// tag: _tag,
			category: categoryDetails._id,
			// thumbnail: thumbnailImage.secure_url,
			studentsEnrolled: userDetails._id,
			status: status,
			createdAt: Date.now()
			// instructions: instructions,
		});

		// Add the new task to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: userDetails._id,
			},
			{
				$push: {
					enrolledChallenges: newTask._id,
				},
			},
			{ new: true }
		);
		// Add the new task to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					Taskes: newTask._id,
				},
			},
			{ new: true }
		);
		// Return the new task and a success message
		res.status(200).json({
			success: true,
			data: newTask,
			message: "task Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the task
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create task",
			error: error.message,
		});
	}
};

exports.getAlltasks = async (req, res) => {
	try {
		const allTasks = await Task.find(
			{ status: "Published" },
			{
				taskName: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allTasks,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch task Data`,
			error: error.message,
		});
	}
};

//gettaskDetails
exports.gettaskDetails = async (req, res) => {
	try {
		//get id

		const { taskId } = req.body;
		//find task details
		const taskDetails = await Task.findOne(
			{ _id: taskId })
			.populate(
				{
					path: "instructor",
					populate: {
						path: "additionalDetails",
					},
				}
			)
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		//validation
		if (!taskDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find the task with ${taskId}`,
			});
		}
		//return response
		console.log(taskDetails);
		return res.status(200).json({
			success: true,
			message: "task Details fetched successfully",
			data: taskDetails,
		})

	}
	catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}



// exports.getTaskDetails = async (req, res) => {
// 	try {
// 	  const { taskId } = req.body
// 	  const taskDetails = await Task.findOne({
// 		_id: taskId,
// 	  })
// 		.populate({
// 		  path: "instructor",
// 		  populate: {
// 			path: "additionalDetails",
// 		  },
// 		})
// 		.populate("category")
// 		.populate("ratingAndReviews")
// 		.populate({
// 		  path: "taskContent",
// 		  populate: {
// 			path: "subSection",
// 			select: "-videoUrl",
// 		  },
// 		})
// 		.exec()

// 	  if (!courseDetails) {
// 		return res.status(400).json({
// 		  success: false,
// 		  message: Could not find course with id: ${courseId},
// 		})
// 	  }



exports.editTask = async (req, res) => {

	try {
		const task = await Task.findById(req.body.taskId)
		if (!task) {
			return res.status(404).json({ error: "Task not found" })
		}

		// If Thumbnail Image is found, update it
		//   if (req.files) {
		// 	console.log("thumbnail update")
		// 	const thumbnail = req.files.thumbnailImage
		// 	const thumbnailImage = await uploadImageToCloudinary(
		// 	  thumbnail,
		// 	  process.env.FOLDER_NAME
		// 	)
		// 	course.thumbnail = thumbnailImage.secure_url
		//   }

		// Update only the fields that are present in the request body
		//   for (const key in updates) {
		// 	if (updates.hasOwnProperty(key)) {
		// 	  if (key === "tag" || key === "instructions") {
		// 		course[key] = JSON.parse(updates[key])
		// 	  } else {
		// 		course[key] = updates[key]
		// 	  }
		// 	}
		//   }
		if (req.body.taskName !== undefined)
			task.taskName = req.body.taskName
		if (req.body.taskDescription !== undefined)
			task.taskDescription = req.body.taskDescription
		if (req.body.category !== undefined)
			task.category = req.body.category
		if (req.body.whatYouWillLearn !== undefined)
			task.whatYouWillLearn = req.body.whatYouWillLearn
		if (req.body.status !== undefined)
			task.status = req.body.status
		await task.save()

		const updatedTask = await Task.findOne({
			_id: req.body.taskId,
		})
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec()
		res.json({
			success: true,
			message: "Task updated successfully",
			data: updatedTask,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		})
	}
}


exports.getStudentTask = async (req, res) => {


	try {

		const instructorId = req.user.id;
		const studentTasks = await Task.find({
			instructor: instructorId,
		}).sort({ createdAt: -1 }).populate({
			path: "taskContent",
			populate: {
				path: "subSection",
			},
		})

		const arr = []
		let c = 0;
		studentTasks.forEach((r) => {
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
		res.status(200).json({
			success: true,
			data: { studentTasks, arr }
		})

	}
	catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: "Failed to Retrives Student Task",
			error: error.message,
		})
	}

}


exports.deleteTask = async (req, res) => {
	try {
		const { taskId } = req.body

		// Find the task
		const task = await Task.findById(taskId)
		if (!task) {
			return res.status(404).json({ message: "task not found" })
		}
		//Find the category and delete the task
		await Category.findByIdAndUpdate(task.category,{
			$pull:{Taskes:taskId}
		})
		// Unenroll students from the course
		const studentsEnrolled = task.studentsEnrolled
		for (const studentId of studentsEnrolled) {
			await User.findByIdAndUpdate(studentId, {
				$pull: { enrolledChallenges: taskId },
			})
		}

		// Delete sections and sub-sections
		const taskSections = task.taskContent
		for (const sectionId of taskSections) {
			// Delete sub-sections of the section
			const section = await Section.findById(sectionId)
			if (section) {
				const subSections = section.subSection
				for (const subSectionId of subSections) {
					await SubSection.findByIdAndDelete(subSectionId)
				}
			}

			// Delete the section
			await Section.findByIdAndDelete(sectionId)
		}

		// Delete the task
		await Task.findByIdAndDelete(taskId)

		return res.status(200).json({
			success: true,
			message: "task deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		})
	}
}




exports.getFullTaskDetails = async (req, res) => {
	try {
		const { taskId } = req.body
		const userId = req.user.id
		const taskDetails = await Task.findOne({
			_id: taskId,
		})
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec()

		let taskProgressCount = await ChallengesProgress.findOne({
			taskID: taskId,
			userId: userId,
		})

		if (!taskDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find task with id: ${taskId}`,
			})
		}

		if (taskDetails.status === "Draft") {
			return res.status(403).json({
				success: false,
				message: `Accessing a draft task is forbidden`,
			});
		}
		let totalDurationInSeconds = 0
		taskDetails.taskContent.forEach((content) => {
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
		return res.status(200).json({
			success: true,
			data: {
				taskDetails,
				totalDuration,
				completedSubsections: taskProgressCount?.completedSubsection
					? taskProgressCount?.completedSubsection
					: [],
			},
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}