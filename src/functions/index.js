// functions function structure
const BookModel = require('../models/books.model')

module.exports.crateBook = async (input) => {
    console.log('input: ', input);
    const { name, price } = input;
    // validate data
    if(!name){
        throw { message: 'no name'}
    }

    // name: { type: String, default: "-" },
    // price: { type: Number },

    // create data
    return BookModel.create({ name, price });
}


module.exports.findBookByName = async (input) => {
    console.log('input: ', input);
    // validate data

    // name: { type: String, default: "-" },
    // price: { type: Number },

    // create data
    return await BookModel.findOne({ name: input });
}