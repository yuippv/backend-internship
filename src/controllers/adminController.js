const mongoose = require("mongoose");

const {
  getResultUsers,
  createAdmin,
  getAdminById: getAdminwithId,
  getAllAdmins: getAllAdminInSystem,
} = require("../functions/index");

exports.getAllResult = async (req, res) => {
  try {
    const results = await getResultUsers();
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

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await getAllAdminInSystem();
    res.send(admins);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};
