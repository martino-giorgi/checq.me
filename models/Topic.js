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
    questions: [{type: mongoose.Schema.ObjectId, ref: 'Question'}]
})

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
