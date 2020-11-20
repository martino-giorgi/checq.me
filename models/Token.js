/**
 * Token schema
 */

const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  //the id of the User which this token is referring to
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  //tokens have a lifespan they can be re-generated if the user does not confirm in time
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
