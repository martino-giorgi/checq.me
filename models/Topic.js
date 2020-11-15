/**
 * Topic schema
 */

const mongoose =  require('mongoose');
const Question = require("./Question");

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: {
        type: [Question],
        required: true
    }
})

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
