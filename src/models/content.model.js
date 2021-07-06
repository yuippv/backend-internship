const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contents = new Schema(
  {
    content_body: { type: String, default: "-" },
    title: { type: String, default: "-" },
    likes: { type: Number, default: 0 },
    uid_likes: [{ type: String, default: "-" }],
    comment_id: [{ type: String, default: "-" }],
    author_username: { type: String, default: "-" },
    author_id: { type: String, defalut: "-" },
    tag: { type: [String], defalut: ["-"] },
    image: { type: String, default: "-" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("contents", contents);
