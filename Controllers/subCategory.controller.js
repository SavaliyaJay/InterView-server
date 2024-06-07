const expressAsyncHandler = require('express-async-handler');
const categorySchema = require('../Models/category.model');
const subCategorySchema = require('../Models/subCategory.model');
const questionSchema = require('../Models/question.model');

const getSubCategories = expressAsyncHandler(async (req, res, next) => {
    const subCategories = await subCategorySchema.findAll();

    if (!subCategories) {
        return res.status(400).json({ success: true, message: "Sub Categories not found" })
    }

    return res.status(200).json({ success: true, subCategories });
});


const getSubCategory = expressAsyncHandler(async (req, res, next) => {
    const subCategory = await subCategorySchema.findOne({ where: { id: req.params.id } });

    if (!subCategory) {
        return res.status(400).json({ success: true, message: "Sub Category not found" })
    }

    return res.status(200).json({ success: true, subCategory });
});

const getSubCategoryUsingCategoryId = expressAsyncHandler(async (req, res, next) => {
    const subCategories = await subCategorySchema.findAll({ where: { c_id: req.params.id } });

    if (!subCategories) {
        return res.status(400).json({ success: true, message: "Sub Categories not found" })
    }

    return res.status(200).json({ success: true, subCategories });
});

const addSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { name, c_id } = req.body;

    if (!name || !c_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const categoryAvailable = await categorySchema.findOne({ where: { id: c_id } });

    if (!categoryAvailable) {
        return res.status(400).json({ success: true, message: "Category not found" })
    }

    const subCategoryAvailable = await subCategorySchema.findOne({ where: { name , c_id }  });

    if (subCategoryAvailable) {
        return res.status(400).json({ success: true, message: "Sub Category already exists" })
    }
    const subCategory = await subCategorySchema.create({ name, c_id });

    if (subCategory) {
        return res.status(201).json({ success: true, message: "Sub Category created successfully.", subCategory })
    } else {
        return res.status(400).json({ success: true, message: "Sub Category not created" })
    }
});

const updateSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { name, c_id } = req.body;

    if (!name || !c_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const categoryAvailable = await categorySchema.findOne({ where: { id: c_id } });

    if (!categoryAvailable) {
        return res.status(400).json({ success: true, message: "Category not found" })
    }

    const subCategoryAvailable = await subCategorySchema.findOne({ where: { id: req.params.id } });

    if (!subCategoryAvailable) {
        return res.status(400).json({ success: true, message: "Sub Category not found" })
    }

    const subCategory = await subCategorySchema.update({ name, c_id }, { where: { id: req.params.id } });

    if (subCategory) {
        return res.status(201).json({ success: true, message: "Sub Category updated successfully.", subCategory })
    } else {
        return res.status(400).json({ success: true, message: "Sub Category not updated" })
    }
});

const deleteSubCategory = expressAsyncHandler(async (req, res, next) => {

    const subCategoryAvailable = await subCategorySchema.findOne({ where: { id: req.params.id } });

    if (!subCategoryAvailable) {
        return res.status(400).json({ success: true, message: "Sub Category not found" })
    }

    const [subCategory, question] = await Promise.all([
        subCategorySchema.destroy({ where: { id: req.params.id } }),
        questionSchema.destroy({ where: { sub_category_id: req.params.id } })
    ]);

    if (subCategory && question) {
        return res.status(201).json({ success: true, message: "Sub Category deleted successfully." })
    } else {
        return res.status(400).json({ success: true, message: "Sub Category not deleted" })
    }
});

module.exports = {
    getSubCategories,
    getSubCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoryUsingCategoryId
};