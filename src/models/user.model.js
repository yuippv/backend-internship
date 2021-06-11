const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    username: { type: String, default: "-" },
    email: { type: String, default: "-" },
    image: { type: String, default: "-" },



  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("users", users);
