const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const books = new Schema(
  {
    name: { type: String, default: "-" },
    price: { type: Number },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("books", books);
