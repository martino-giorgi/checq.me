/**
 * Answer schema
 */

const mongoose =  require('mongoose');

const AnswerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;