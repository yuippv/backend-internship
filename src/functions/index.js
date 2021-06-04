// functions function structure
const BookModel = require('../models/books.model')

module.exports.crateBook = async (input) => {
    console.log('input: ', input);
    // validate data

    // name: { type: String, default: "-" },
    // price: { type: Number },

    // create data
    return BookModel.create(input);
}


module.exports.findBookByName = async (input) => {
    console.log('input: ', input);
    // validate data

    // name: { type: String, default: "-" },
    // price: { type: Number },

    // create data
    return await BookModel.findOne({ name: input });
}