const questionModel = require("../models/questions.model");
const {
  createAdmin,
  getAdminById: getAdminwithId,
  getAllAdmins: getAllAdminInSystem,
} = require("../functions/index");
const resultor = require("../models/user.result");

exports.getAllResult = async (req, res) => {
  try {
    const results = await resultor.find();
    res.send(results);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const admin = await createAdmin(req.body);
    res.send(admin);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await getAdminwithId(req.params._id);
    res.send(admin);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getAllAdmins = async (res) => {
  try {
    const admins = await getAllAdminInSystem();
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
    const catName = req.body.QCAT;
    const question = await questionModel.find({ QCAT: catName });
    res.send(question);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};
