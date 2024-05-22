// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description, timeDuration } = req.body

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !timeDuration) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" })
    }

    const [value,unit]=timeDuration.split(' ')
    let time=parseInt(value);
    if(unit==='min')
      time=time*60;
    else
      time=time*3600;
    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      description: description,
      timeDuration: time
    })

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection")

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description, timeDuration } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }

    if (timeDuration !== undefined) {
      const [value,unit]=timeDuration.split(' ')
      let time=parseInt(value);
      if(unit==='min')
        time=time*60;
      else
        time=time*3600;
      subSection.timeDuration = time
    }

    await subSection.save()
    const updatedSection = await Section.findById(sectionId).populate("subSection")
    return res.json({
      success: true,
      data: updatedSection,

      message: "Section updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }
    const updatedSection = await Section.findById(sectionId).populate("subSection")
    return res.json({
      success: true,
      data: updatedSection,

      message: "SubSection deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}