const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  AID: {
    type: String,
    required: true,
    unique: true,
  },
  Apassword: {
    type: String,
    required: true,
  },
});

//hash password
AuthSchema.pre("save", async function (next) {
  const AID = this;
  const hash = await bcrypt.hash(this.Apassword, 10);

  this.Apassword = hash;
  next();
});

//valid password
AuthSchema.methods.isValidPassword = async function (Apassword) {
  const AID = this;
  const compare = await bcrypt.compare(Apassword, AID.Apassword);
  return compare;
};

const AuthModel = mongoose.model("auth", AuthSchema);

module.exports = AuthModel;
