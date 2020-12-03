/**
 * Topic schema
 */

const mongoose = require("mongoose");
const Question = require("./Question");

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    default: []
  }],
  mastery_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Masterycheck",
  },
});

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
