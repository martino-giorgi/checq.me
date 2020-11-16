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
});

const MasteryCheck = mongoose.model("MasteryCheck", MasteryCheckSchema);

module.exports = MasteryCheck;
