const bookModel = require("../models/bookModel");

module.exports.create = async (payload) => {
  return bookModel.create(payload);
};

module.exports.findAll = async () => {
  return bookModel.find({});
};

module.exports.findByName = async (name) => {
  return bookModel.findOne({ name, isDelete: false });
};

module.exports.findById = async (bookId) => {
  return bookModel.findOne({ _id: bookId, isDelete: false });
};

module.exports.deleteById = async (bookId) => {
  return bookModel.findOneAndUpdate(
    { _id: bookId },
    { isDelete: true, deleted_at: new Date().toISOString() },
    { new: true }
  );
};

module.exports.patch = async (bookId, payload) => {
  return bookModel.findOneAndUpdate(
    { _id: bookId },
    { $set: payload },
    { new: true, omitUndefined: true }
  );
};

module.exports.update = async (bookId, payload) => {
  return bookModel.findOneAndUpdate(
    { _id: bookId },
    { $set: payload },
    { new: true, omitUndefined: true }
  );
};
