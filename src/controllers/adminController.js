const questionModel = require("../models/questions.model");
const {
  findAdminById,
  findAllAdmins,
  postQuestion,
} = require("../functions/index");
const resultor = require("../models/result.model");

exports.getAllResult = async (req, res) => {
  try {
    const results = await resultor.find();
    if (!results.length) {
      throw {
        message: "result not found",
        status: 404,
      };
    } else res.send(results);
  } catch (err) {
    next(err);
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    if (req.body._id) {
      const userId = req.body._id;
      const admin = await findAdminById(userId);
      res.send(admin);
    } else {
      const { userId } = req;
      const admin = await findAdminById(userId);
      res.send(admin);
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await findAllAdmins();
    res.send(admins);
  } catch (err) {
    next(err);
  }
};

exports.postQuestion = async (req, res, next) => {
  try {
    const question = await postQuestion(req.body);
    res.send(question);
  } catch (err) {
    next(err);
  }
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const question = await questionModel.find({});
    if (!question.length) {
      throw {
        message: "question not found",
        status: 404,
      };
    } else res.send(question);
  } catch (err) {
    next(err);
  }
};

exports.getQuestionByCat = async (req, res, next) => {
  try {
    const catName = req.body.question_category;
    const question = await questionModel.find({ question_category: catName });
    if (!question.length) {
      throw {
        message: "Invalid category",
        status: 400,
      };
    }
    res.send(question);
  } catch (err) {
    next(err);
  }
};

exports.updateFields = async (req, res, next) => {
  try {
    const up = await questionModel.updateMany(
      {},
      { $rename: { QCAT: "question_category" } }
    );
    res.send(up);
  } catch (err) {
    next(err);
  }
};
