// functions function structure
const UserModel = require("../models/user.model");
var mongoose = require('mongoose');

module.exports.createUser = async (input) => {
  const { name, lastname, username, email, password, image } = input;

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

  return await UserModel.create({ name, lastname, username, email, password, image });

}
