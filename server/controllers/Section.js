const Section = require("../models/Section");
const Challenges = require("../models/Challenges");
const Task = require("../models/Task")
const SubSection = require("../models/SubSection")
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, taskId } = req.body;

		// Validate the input
		if (!sectionName || !taskId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the task's content array
		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{
				$push: {
					taskContent: newSection._id,
				},
			},
			{ new: true }
		)
			//populate ke karan task mein section or subsection ka data store ya diskha sakte haii
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedTask,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, taskId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const task = await Task.findById(taskId)
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
		res.status(200).json({
			success: true,
			message: section,
			data: task,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, taskId } = req.body;
		await Task.findByIdAndUpdate(taskId, {
			$pull: {
				taskContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, taskId);
		if (!section) {
			return res.status(404).json({
				success: false,
				message: "Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({ _id: { $in: section.subSection } });

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const task = await Task.findById(taskId).populate({
			path: "taskContent",
			populate: {
				path: "subSection"
			}
		})
			.exec();

		res.status(200).json({
			success: true,
			message: "Section deleted",
			data: task
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};