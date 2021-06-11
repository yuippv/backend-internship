// functions function structure
const UserModel = require("../models/user.model");
var mongoose = require('mongoose');

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

  if (!user) {
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