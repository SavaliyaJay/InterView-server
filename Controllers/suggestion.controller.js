const answerSchema = require("../Models/answer.model");
const questionSchema = require("../Models/question.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getSuggestedAnswer = async (req, res) => {
    const { questionId, answerId } = req.query;

    if ( !questionId || !answerId) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const question = await questionSchema.findOne({ where: { id: questionId } });

    if (!question) {
        return res.status(400).json({ success: false, message: "Question not found" });
    }

    const answer = await answerSchema.findOne({ where: { id: answerId } });

    if (!answer) {
        return res.status(400).json({ success: false, message: "Answer not found" });
    }

    const prompt = `question: ${question.question} & My answer${answer.answer} so that, based on the context, the AI can generate a response.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return res.status(200).json({ success: true, text });
}

module.exports = {
    getSuggestedAnswer
}