// functions function structure
const UserModel = require("../models/user.model");
const UserResult = require("../models/user.result");
const AdminModel = require("../models/admin.model");
const CommentModel = require("../models/comment.model");
const GuestModel = require("../models/guest.model")

var mongoose = require('mongoose');
const commentModel = require("../models/comment.model");

module.exports.createUser = async (input) => {
  const { name, lastname, username, email, password, image, isDeleted } = input;

  if (!name) {
    throw { message: "no name" };
  }
  else if (!lastname) {
    throw { message: "no lastname" };
  }
  else if (!username) {
    throw { message: "no username" };
  }
  else if (!email) {
    throw { message: "no email" };
  }
  else if (!password) {
    throw { message: "no password" };
  }

  return await UserModel.create({ name, lastname, username, email, password, image, isDeleted });

}

module.exports.findUserById = async (input) => {
  if (mongoose.Types.ObjectId.isValid(input)) {
    return await UserModel.findOne({ _id: input, isDeleted: false });
  }
  else {
    throw {
      message: "user not found",
      status: 404
    };
  }
}

module.exports.updateUserById = async (payload, userId) => {
  const { name, lastname, username, email, password, image } = payload;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      message: "Invalid ID",
      status: 404
    };
  }

  const user = await UserModel.findOne({
    _id: userId,
    isDeleted: false
  });

  if (user == null) {
    throw { message: "user not found", status: 404 };
  }

  return UserModel.findOneAndUpdate(
    { _id: userId },
    { name, lastname, username, email, password, image },
    { new: true, omitUndefined: true }
  )

};

module.exports.deleteUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      message: "Invalid ID",
      status: 404
    };
  }

  const checkDelete = await UserModel.findOne({
    _id: userId,
    isDeleted: true
  });

  if (checkDelete) {
    throw { message: "This user is already deleted" }
  }

  return UserModel.findOneAndUpdate(
    { _id: userId },
    {
      delete_at: new Date(),
      isDeleted: true
    },
    { new: true }
  )
}


module.exports.createResultById = async (description, result, score, userid) => {
  console.log(userid, description, result, score)
  return await UserResult.create({ userid, description, result, score });
}

module.exports.getResultById = async (userid) => {

  return await UserResult.find({ userid: userid });
}

module.exports.createAdmin = async (input) => {
  const { name, lastname, username, email, password, image, isDeleted } = input;
  return await AdminModel.create({ name, lastname, username, email, password, image, isDeleted });
}

module.exports.getAdminById = async (input_id) => {
  if (mongoose.Types.ObjectId.isValid(input_id)) {
    return await AdminModel.findOne({
      _id: input_id,
      isDeleted: false
    });
  }
  else {
    throw {
      message: "admin not found",
      status: 404
    };
  }
}

module.exports.getAllAdmins = async () => {
  return await AdminModel.find({
    isDeleted: false
  });
}

module.exports.getAllUsers = async () => {
  return await UserModel.find({
    isDeleted: false
  });
}

module.exports.createCommnet = async (input) => {
  const { comment_body, uid } = input;
  return await CommentModel.create({ comment_body, uid });
}

module.exports.createGuest = async (input) => {
  const { name } = input;
  return await GuestModel.create({ name });
}