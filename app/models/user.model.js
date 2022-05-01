const mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    firstlastname: { type: String, default: null },
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  }
  // { timestamps: true }
);
userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
