// functions function structure
const UserModel = require("../models/user.model");
const UserResult = require("../models/user.result");
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


module.exports.createResultById = async (description,result,score,userid) => {
  console.log(userid,description, result, score)
  return await UserResult.create({ userid,description, result, score});
}

module.exports.getResultById = async (userid) => {
  
  return await UserResult.find({ userid: userid});
}