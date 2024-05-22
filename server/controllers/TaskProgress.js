const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const ChallengesProgress = require("../models/ChallengesProgress")
const User = require("../models/User")

exports.updateTaskProgress = async (req, res) => {
  const { taskId, subSectionId } = req.body
  const userId = req.user.id
  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subSectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find the task progress document for the user and task
    let taskProgress = await ChallengesProgress.findOne({
      challengeId: taskId,
      userId: userId,
    })

    if (!taskProgress) {
      // If task progress doesn't exist, create a new one
      const challengeProgress = await ChallengesProgress.create({
        challengeId: taskId,
        userId: userId,
        completedSubsection: subSectionId
      })
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            TaskProgress: challengeProgress._id,
          },
        },
        { new: true }
      )
      return res.status(200).json({ message: "Task progress updated" })
    } else {
      // If task progress exists, check if the subsection is already completed
      if (taskProgress.completedSubsection.includes(subSectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedSubsections array
      taskProgress.completedSubsection.push(subSectionId)

    // Save the updated task progress
    await taskProgress.save()

    return res.status(200).json({ message: "Task progress updated" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}