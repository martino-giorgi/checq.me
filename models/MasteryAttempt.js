/**
 * Answer schema
 */

const mongoose = require("mongoose");

const MasteryAttemptSchema = new mongoose.Schema({
  classroom_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Classroom",
    required: true,
  },
  mastery_id: {
    type: mongoose.Schema.ObjectId,
    ref: "MasteryCheck",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  ta_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  grade: {
    type: String,
    required: false,
  },
  topics: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Topic",
    },
  ],
});

const Answer = mongoose.model("MasteryAttempt", MasteryAttemptSchema);

module.exports = MasteryAttempt;
