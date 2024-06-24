const answerSchema = require("../Models/answer.model");
const questionSchema = require("../Models/question.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getSuggestedAnswer = async (req, res) => {
    const { questionId, answerId } = req.query;

    if (!questionId || !answerId) {
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

    const prompt = `Interview preparation: ${question.question} - My answer: ${answer.answer}. Provide a concise response based on this context. (Limit: 50 words) also Provide two sub-topics, each in 10 words, with headings in **bold**.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = "You can also try " + response.text();

    return res.status(200).json({ success: true, text });
}

module.exports = {
    getSuggestedAnswer
}