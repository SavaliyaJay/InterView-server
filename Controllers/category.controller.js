const expressAsyncHandler = require('express-async-handler');
const categorySchema = require('../Models/category.model');
const subCategorySchema = require('../Models/subCategory.model');

const getCategories = expressAsyncHandler(async (req, res, next) => {
    const categories = await categorySchema.findAll();

    if (!categories) {
        return res.status(400).json({ success: true, message: "Categories not found" })
    }

    return res.status(200).json({ success: true, categories });
});

const getCategory = expressAsyncHandler(async (req, res, next) => {
    const category = await categorySchema.findOne({ where: { id: req.params.id } });

    if (!category) {
        return res.status(400).json({ success: true, message: "Category not found" })
    }

    return res.status(200).json({ success: true, category });
});

const addCategory = expressAsyncHandler(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const categoryAvailable = await categorySchema.findOne({ where: { name } });

    if (categoryAvailable) {
        return res.status(200).json({ success: false, message: "Category already exists" });
    }

    const category = await categorySchema.create({ name });

    if (category) {
        return res.status(201).json({ success: true, message: "Category created successfully.", category })
    } else {
        return res.status(400).json({ success: true, message: "Category not created" })
    }
});


const updateCategory = expressAsyncHandler(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const categoryAvailable = await categorySchema.findOne({ where: { id: req.params.id } });

    if (!categoryAvailable) {
        return res.status(400).json({ success: true, message: "Category not found" })
    }

    const category = await categorySchema.update({ name }, { where: { id: req.params.id } });

    if (category) {
        return res.status(201).json({ success: true, message: "Category updated successfully.", category })
    } else {
        return res.status(400).json({ success: true, message: "Category not updated" })
    }
});

const deleteCategory = expressAsyncHandler(async (req, res, next) => {
    
    const categoryAvailable = await categorySchema.findOne({ where: { id: req.params.id } });
    
    if (!categoryAvailable) {
        return res.status(400).json({ success: true, message: "Category not found" })
    }

    const [category, subCategory] = await Promise.all([
        categorySchema.destroy({ where: { id: req.params.id } }),
        subCategorySchema.destroy({ where: { c_id: req.params.id } })
    ]);
    
    if (category && subCategory) {
        return res.status(201).json({ success: true, message: "Category deleted successfully." })    
    } else {
        return res.status(400).json({ success: true, message: "Category not deleted" })
    }
});

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}

