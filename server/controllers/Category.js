const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        console.log(req.user.accountType);
        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategorysDetails);

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",

        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        });
    }
};


exports.showAllCategories = async (req, res) => {
    try {
        const allCategorys = await Category.find(
            {},
            { name: true, description: true }
        );
        res.status(200).json({
            success: true,
            data: allCategorys,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const { categoryId } = req.body;
        //get taskes for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "Taskes",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category Not Found',
            });
        }

        // Handle the case when there are no tasks
        if (selectedCategory.Taskes.length === 0) {
            console.log("No tasks found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No tasks found for the selected category.",
            })
        }

        //get taskes for different categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "Taskes",
                match: { status: "Published" },
            })
            .exec()

        //get top 10 selling courses
        //HW - write it on your own

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
            },
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}