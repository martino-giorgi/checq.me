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
  appointment_duration:{
    type: Number,
    required: true
  },
  locked_by:{ //if masterys are ORDERED than this field indicates which mastery check needs to have a PASS/EXCEED in order to be available for booking
    type:mongoose.Schema.ObjectId,
    ref: 'MasteryCheck',
    required:false
  }
});

const MasteryCheck = mongoose.model("MasteryCheck", MasteryCheckSchema);

module.exports = MasteryCheck;
