const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema(
  {
    name: { type: String, default: "-" },
    price: { type: Number, index: true },
    isDelete: { type: Boolean, index: true, default: false },
    deleted_at: { type: Date },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("books", book);
