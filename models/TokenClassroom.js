/**
 * Token schema
 */

const mongoose = require("mongoose");

const TokenClassroomSchema = new mongoose.Schema({
  //the id of the User which this token is referring to
  _classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Classroom",
  },
  token: { type: String, required: true },
  //tokens have a lifespan they can be re-generated if the user does not confirm in time
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200*5 },
});

const TokenClassroom = mongoose.model("TokenClassroom", TokenClassroomSchema);

module.exports = TokenClassroom;
