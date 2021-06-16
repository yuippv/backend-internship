// functions function structure
const UserModel = require("../models/user.model");
const UserResult = require("../models/user.result");
const AdminModel = require("../models/admin.model");
const CommentModel = require("../models/comment.model");
const GuestModel = require("../models/guest.model");
const ContentModel = require("../models/content.model");

var mongoose = require("mongoose");

module.exports.createUser = async (input) => {
  const { name, lastname, username, email, password, image, isDeleted } = input;

  //create function handle error
  if (!name) {
    throw { message: "no name" };
  } else if (!lastname) {
    throw { message: "no lastname" };
  } else if (!username) {
    throw { message: "no username" };
  } else if (!email) {
    throw { message: "no email" };
  } else if (!password) {
    throw { message: "no password" };
  }

  return await UserModel.create({
    name,
    lastname,
    username,
    email,
    password,
    image,
    isDeleted,
  });
};

module.exports.findUserById = async (input) => {
  //mongoose.Types.ObjectId.isValid ใช้เยอะ ประกาศตัวแปรดีกว่า
  if (mongoose.Types.ObjectId.isValid(input)) {
    return await UserModel.findOne({ _id: input, isDeleted: false });
  } else {
    throw {
      message: "user not found",
      status: 404,
    };
  }
};

module.exports.updateUserById = async (payload, userId) => {
  const { name, lastname, username, email, password, image } = payload;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      message: "Invalid ID",
      status: 404,
    };
  }

  const user = await UserModel.findOne({
    _id: userId,
    isDeleted: false,
  });

  if (user == null) {
    throw { message: "user not found", status: 404 };
  }

  return UserModel.findOneAndUpdate(
    { _id: userId },
    { name, lastname, username, email, password, image },
    { new: true, omitUndefined: true }
  );
};

module.exports.deleteUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      message: "Invalid ID",
      status: 404,
    };
  }

  const checkDelete = await UserModel.findOne({
    _id: userId,
    isDeleted: true,
  });

  if (checkDelete) {
    throw { message: "This user is already deleted" };
  }

  return UserModel.findOneAndUpdate(
    { _id: userId },
    {
      delete_at: new Date(),
      isDeleted: true,
    },
    { new: true }
  );
};

module.exports.createResultById = async (answers, userid) => {
  const n = answers.length;
  let question = [];
  const result = [
    [0, 9, 16, 24, 33],
    [4, 14, 21, 25, 31],
    [6, 18, 23, 28, 32],
    [2, 8, 26, 30, 36],
    [1, 10, 19, 29, 39],
    [3, 11, 17, 34, 38],
    [7, 13, 20, 27, 35],
    [5, 12, 15, 22, 37],
  ];

  if (n == 40) {
    for (let i = 0; i < result.length; i++) {
      let s = result[i]
        .map((item) => answers[item])
        .reduce((sum, number) => {
          return sum + number;
        }, 0);
      question.push(s);
    }

    return await UserResult.create({ userid, answers, result: question });
  } else
    throw new Error(
      "Please input appropriate size of answer(n must be equal to 40)"
    );
};

module.exports.getResultById = async (userid) => {
  return await UserResult.find({ userid: userid });
};

module.exports.getAllResult = async () => {
  // await
  return UserResult.find();
};
module.exports.createAdmin = async (input) => {
  const { name, lastname, username, email, password, image, isDeleted } = input;
  return await AdminModel.create({
    name,
    lastname,
    username,
    email,
    password,
    image,
    isDeleted,
  });
};

module.exports.getAdminById = async (input_id) => {
  if (mongoose.Types.ObjectId.isValid(input_id)) {
    return await AdminModel.findOne({
      _id: input_id,
      isDeleted: false,
    });
  } else {
    throw {
      message: "admin not found",
      status: 404,
    };
  }
};

module.exports.getAllAdmins = async () => {
  return await AdminModel.find({
    isDeleted: false,
  });
};

module.exports.getAllUsers = async () => {
  return await UserModel.find({
    isDeleted: false,
  });
};

module.exports.createCommnet = async (input) => {
  const { comment_body, uid } = input;
  return await CommentModel.create({ comment_body, uid });
};

// มีตัวเดียวรับเป็น parameter ได้เลย
module.exports.createGuest = async (input) => {
  const { name } = input;
  return await GuestModel.create({ name });
};

module.exports.createContent = async (input) => {
  const {
    title,
    likes,
    uid_likes,
    comment_id,
    author_name,
    author_id,
    tag,
    image,
  } = input;
  return await ContentModel.create({
    title,
    likes,
    uid_likes,
    comment_id,
    author_name,
    author_id,
    tag,
    image,
  });
};

module.exports.getAllContents = async () => {
  return await ContentModel.find({
    isDeleted: false,
  });
};

module.exports.getSortByTag = async (input) => {
  return await ContentModel.find({
    tag: input,
  }).exec();
};
