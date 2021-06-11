const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const results = new Schema(
  {
    userid : {type : String , default:"-"},
    description: { type: String, default: "-" },
    result: { type: String, default: "-" },
    score: [{ type: Number, default: "-" }]
  },
  {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("results", results);
