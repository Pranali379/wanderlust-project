const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Handle both export types safely
userSchema.plugin(
  passportLocalMongoose.default || passportLocalMongoose
);

module.exports = mongoose.model("User", userSchema);