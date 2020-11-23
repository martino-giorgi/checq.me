const mongoose = require("mongoose");

const MasteryCheckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean, // true if the student can schedule it, false otherwise
    required: true,
  },
  classroom: {
    type: mongoose.Schema.ObjectId,
    ref: "Classroom",
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  topics: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Topic",
    },
  ],
});

const MasteryCheck = mongoose.model("MasteryCheck", MasteryCheckSchema);

module.exports = MasteryCheck;