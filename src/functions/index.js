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

module.exports.createResultById = async (results, userid) => {
  let questions = results.length;
  let category = {
    "Word Smart": 0,
    "Logic Smart": 0,
    "Picture Smart": 0,
    "Body Smart": 0,
    "Music Smart": 0,
    "People Smart": 0,
    "Self Smart": 0,
    "Nature Smart": 0,
  };

  for (let i = 0; i < questions; i++) {
    category_id = results[i]["categoryId"];
    question_index = results[i]["questionIndex"];
    score = results[i]["score"];
    if (category_id == 1) {
      category["Word Smart"] += score;
    } else if (category_id == 2) {
      category["Logic Smart"] += score;
    } else if (category_id == 3) {
      category["Picture Smart"] += score;
    } else if (category_id == 4) {
      category["Body Smart"] += score;
    } else if (category_id == 5) {
      category["Music Smart"] += score;
    } else if (category_id == 6) {
      category["People Smart"] += score;
    } else if (category_id == 7) {
      category["Self Smart"] += score;
    } else if (category_id == 8) {
      category["Nature Smart"] += score;
    } else {
      throw { message: "invalid category" };
    }
  }
  return await UserResult.create({
    userid: userid,
    category: category,
  });
};

module.exports.getResultById = async (userid) => {
  return await UserResult.find({ userid: userid });
};

module.exports.getResultUsers = async () => {
  return await UserResult.find();
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
  const { comment_body } = input;
  return await CommentModel.create({ comment_body, uid: input.uid });
};

// มีตัวเดียวรับเป็น parameter ได้เลย
module.exports.createGuest = async (input) => {
  const { name } = input;
  return await GuestModel.create({ name });
};

module.exports.createContent = async (input) => {
  const {
    content_body,
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
    content_body,
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

module.exports.getSortByTag = async (tag) => {
  return await ContentModel.find({
    tag: { $in: tag },
  });
};
