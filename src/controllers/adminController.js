const questionModel = require("../models/questions.model");
const { findAdminById, findAllAdmins } = require("../functions/index");
const resultor = require("../models/result.model");

exports.getAllResult = async (req, res) => {
  try {
    const results = await resultor.find();
    res.send(results);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const { userId } = req;
    const admin = await findAdminById(userId);
    res.send(admin);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await findAllAdmins();
    res.send(admins);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.postQuestion = async (req, res) => {
  try {
    const question = await questionModel.create(req.body);
    res.send(question);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getQuestions = async (res) => {
  try {
    const question = await questionModel.find();
    res.send(question);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getQuestionByCat = async (req, res) => {
  try {
    const catName = req.body.question_category;
    const question = await questionModel.find({ question_category: catName });
    res.send(question);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};
