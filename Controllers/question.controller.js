const questionSchema = require('../Models/question.model');
const answerSchema = require('../Models/answer.model');
const subCategorySchema = require('../Models/subCategory.model');
const expressAsyncHandler = require('express-async-handler');

const getQuestions = expressAsyncHandler(async (req, res, next) => {
    const questions = await questionSchema.findAll({
        include: {
            model: subCategorySchema,
            as: 'subCategory',
            attributes: ['name']
        }
    });

    if (!questions) {
        return res.status(400).json({ success: true, message: "Questions not found" })
    }

    return res.status(200).json({ success: true, questions });
});

const getsubCategoryQuestion = expressAsyncHandler(async (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    let skip = (page - 1) * limit;
    const totalQuestions = await questionSchema.count({
        where: { subCategoryId: req.params.id }
    });

    const totalPages = Math.ceil(totalQuestions / limit);

    const questionsData = await questionSchema.findAll({
        where: { subCategoryId: req.params.id },
        limit: limit,
        offset: skip
    });

    if (!questionsData || questionsData.length > 0) {
        const questions = questionsData[0].dataValues;
        return res.status(200).json({ success: true, questions, totalPages });
    }else{
        return res.status(200).json({ success: true, message: "Questions not found" });
    }
});

const getQuestion = expressAsyncHandler(async (req, res, next) => {
    const question = await questionSchema.findOne({ where: { id: req.params.id } });

    if (!question) {
        return res.status(400).json({ success: true, message: "Question not found" })
    }

    return res.status(200).json({ success: true, question });
});

const addQuestion = expressAsyncHandler(async (req, res, next) => {
    const { question, subCategory_id } = req.body;

    if (!question || !subCategory_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }


    const subCategoryAvailable = await subCategorySchema.findOne({ where: { id: subCategory_id } });

    if (!subCategoryAvailable) {
        return res.status(400).json({ success: true, message: "Sub Category not found" })
    }

    const questionAvailable = await questionSchema.findOne({ where: { question, subCategoryId: subCategory_id } });
    if (questionAvailable) {
        return res.status(400).json({ success: true, message: "Question already exists" })
    }

    const newQuestion = await questionSchema.create({ question, subCategoryId: subCategory_id });

    if (newQuestion) {
        return res.status(201).json({ success: true, message: "Question created successfully.", newQuestion });
    } else {
        return res.status(400).json({ success: false, message: "Question not created" });
    }

});

const updateQuestion = expressAsyncHandler(async (req, res, next) => {
    const { question, subCategory_id } = req.body;

    if (!question || !subCategory_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const questionAvailable = await questionSchema.findOne({ where: { id: req.params.id } });

    if (!questionAvailable) {
        return res.status(400).json({ success: true, message: "Question not found" })
    }

    const updateQuestion = await questionSchema.update({ question, subCategory_id }, { where: { id: req.params.id } });

    if (updateQuestion) {
        return res.status(201).json({ success: true, message: "Question updated successfully.", updateQuestion })
    }
    else {
        return res.status(400).json({ success: true, message: "Question not updated" })
    }
});

const deleteQuestion = expressAsyncHandler(async (req, res, next) => {
    const question = await questionSchema.findOne({ where: { id: req.params.id } });

    if (!question) {
        return res.status(400).json({ success: true, message: "Question not found" })
    }

    const [deleteQuestion, answer] = await Promise.all([
        questionSchema.destroy({ where: { id: req.params.id } }),
        answerSchema.destroy({ where: { question_id: req.params.id } })
    ]);

    if (deleteQuestion && answer) {
        return res.status(200).json({ success: true, message: "Question deleted successfully." })
    } else {
        return res.status(400).json({ success: true, message: "Question not deleted" })
    }
});

module.exports = {
    getQuestions,
    getsubCategoryQuestion,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
};

