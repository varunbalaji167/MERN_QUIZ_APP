const Response = require("../models/responseModel");
const Quiz = require("../models/quizModel");

const createResponse = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Create a new response
    const respo = await Response.create({ responseData: req.body, quizId });

    // Increment the attempts count for the quiz
    await Quiz.findByIdAndUpdate(quizId, { $inc: { attempts: 1 } });

    res.status(200).json(respo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const get_ResponseById = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const respo = await Response.find({ quizId: quizId });
    res.status(200).json(respo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createResponse,
  get_ResponseById,
};
