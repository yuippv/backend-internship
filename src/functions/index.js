// functions function structure
const BookModel = require("../models/books.model");

module.exports.crateBook = async (input) => {
  console.log("input: ", input);
  const { name, price } = input;
  // validate data
  if (!name) {
    throw { message: "no name" };
  }

  // name: { type: String, default: "-" },
  // price: { type: Number },

  // create data
  return BookModel.create({ name, price });
};

module.exports.findBookByName = (input) => {
  console.log("input: ", input);
  // validate data

  // name: { type: String, default: "-" },
  // price: { type: Number },

  // create data
  return BookModel.findOne({ name: input, deleted_at: { $exists: false } });
};

module.exports.updateBookById = async (input) => {
  const { _id, name, price } = input;

  // validate data

  // name: { type: String, default: "-" },
  // price: { type: Number },

  // create data
  return await BookModel.findOneAndUpdate(
    { _id },
    { name, price },
    { new: true, omitUndefined: true }
  );
};

module.exports.deleteBookById = async (input) => {
  const { _id } = input;
  return await BookModel.findByIdAndDelete(_id);
};

module.exports.softDeleteBookById = async (input) => {
  const { _id } = input;
  return await BookModel.findOneAndUpdate(
    { _id },
    { deleted_at: new Date() },
    { new: true }
  );
};
