// functions function structure
const bookRepo = require("../repositories/bookRepo");

module.exports.create = async (payload) => {
  try {
    let { name, price } = payload;
    const book = await bookRepo.findByName(name);
    book && (name = `${name} 1`);
    return bookRepo.create({ name, price });
  } catch (err) {
    throw err;
  }
};

module.exports.findAll = async () => {
  return bookRepo.findAll();
};

module.exports.findById = async (bookId) => {
  //TODO
  return bookRepo.findById(bookId);
};

module.exports.patch = async (bookId, payload) => {
  return bookRepo.patch(bookId, payload);
};
