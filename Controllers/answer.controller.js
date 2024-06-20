const expressAsyncHandler = require("express-async-handler");
const answerSchema = require("../Models/answer.model");
const questionSchema = require("../Models/question.model");
const userSchema = require('../Models/user.model');

const getAnswers = expressAsyncHandler(async (req, res, next) => {
    const answers = await answerSchema.findAll();

    if (!answers) {
        return res.status(400).json({ success: true, message: "Answers not found" });
    }

    return res.status(200).json({ success: true, answers });
});

const getAnswer = expressAsyncHandler(async (req, res, next) => {
    const answer = await answerSchema.findOne({ where: { id: req.params.id } });

    if (!answer) {
        return res.status(400).json({ success: true, message: "Answer not found" });
    }

    return res.status(200).json({ success: true, answer });
});

const getQuestionAnswer = expressAsyncHandler(async (req, res, next) => {
    const user_id = req.user.id;
    const question_id = req.params.id;

    if (!user_id || !question_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const userAvailable = await userSchema.findOne({ where: { id: user_id } });

    if (!userAvailable) {
        return res.status(400).json({ success: true, message: "User not found" });
    }

    const questionAvailable = await questionSchema.findOne({ where: { id: question_id } });

    if (!questionAvailable) {
        return res.status(400).json({ success: true, message: "Question not found" });
    }

    const answerData = await answerSchema.findAll({ where: { questionId: question_id, user_id: user_id } });

    if (!answerData || answerData.length > 0) {
        const answers = answerData[0].dataValues;
        return res.status(200).json({ success: true, answers });
    }else{
        return res.status(200).json({ success: true, message: "No answer found" });
    }

});

const addAnswer = expressAsyncHandler(async (req, res, next) => {
    const { answer, question_id } = req.body;
    const user_id = req.user.id;

    if (!answer || !question_id || !user_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const userAvailable = await userSchema.findOne({ where: { id: user_id } });

    if (!userAvailable) {
        return res.status(400).json({ success: true, message: "User not found" });
    }

    const questionAvailable = await questionSchema.findOne({ where: { id: question_id } });

    if (!questionAvailable) {
        return res.status(400).json({ success: true, message: "Question not found" });
    }

    const newAnswer = await answerSchema.create({ answer, questionId: question_id, u_id: user_id });

    if (newAnswer) {
        return res.status(200).json({ success: true, message: "Answer created successfully.", newAnswer });
    } else {
        return res.status(400).json({ success: true, message: "Answer not created" });
    }
});

const updateAnswer = expressAsyncHandler(async (req, res, next) => {
    const { answer, question_id } = req.body;
    const user_id = req.user.id;

    if (!answer || !question_id || !user_id) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const userAvailable = await userSchema.findOne({ where: { id: user_id } });

    if (!userAvailable) {
        return res.status(400).json({ success: true, message: "User not found" });
    }

    const questionAvailable = await questionSchema.findOne({ where: { id: question_id } });

    if (!questionAvailable) {
        return res.status(400).json({ success: true, message: "Question not found" });
    }

    const answerAvailable = await answerSchema.findOne({ where: { id: req.params.id } });

    if (!answerAvailable) {
        return res.status(400).json({ success: true, message: "Answer not found" });
    }

    const updatedAnswer = await answerSchema.update({ answer }, { where: { user_id: user_id, question_id: question_id } });

    if (updatedAnswer) {
        return res.status(200).json({ success: true, message: "Answer updated successfully." });
    } else {
        return res.status(400).json({ success: true, message: "Answer not updated" });
    }
});

const deleteAnswer = expressAsyncHandler(async (req, res, next) => {
    const answer = await answerSchema.findOne({ where: { id: req.params.id } });

    if (!answer) {
        return res.status(400).json({ success: true, message: "Answer not found" });
    }

    const deletedAnswer = await answerSchema.destroy({ where: { id: req.params.id } });

    if (deletedAnswer) {
        return res.status(200).json({ success: true, message: "Answer deleted successfully." });
    } else {
        return res.status(400).json({ success: true, message: "Answer not deleted" });
    }
});

module.exports = {
    getAnswers,
    getAnswer,
    addAnswer,
    updateAnswer,
    deleteAnswer,
    getQuestionAnswer
};