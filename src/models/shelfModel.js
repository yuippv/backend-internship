const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const shelf = new Schema(
  {
    name: { type: String, required: true },
    books: [{ type: ObjectId, ref: "books" }],
    firstBook: { type: ObjectId },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("shelfs", shelf);
