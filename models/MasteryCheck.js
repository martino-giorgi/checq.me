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
  mandatory: {
    // true if the student need to pass this mastery check to schedule the next one, false otherwise
    type: Boolean,
    required: false,
  },
  available: {
    type: Boolean, // true if the student can schedule it, false otherwise
    required: true,
  },
});

const MasteryCheck = mongoose.model("MasteryCheck", MasteryCheckSchema);

module.exports = MasteryCheck;
