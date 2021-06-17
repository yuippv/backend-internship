const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questions = new Schema(
  {
    QNO: { type: String, default: "-" },
    QCAT: { type: String, default: "-" },
    QBODY: { type: String, default: "-" }
  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("questions", questions);