/**
 * Answer schema
 */

const mongoose =  require('mongoose');

const AnswerSchema = new mongoose.Schema({
    mastery: {
        type: mongoose.Schema.ObjectId,
        ref: 'MasteryCheck',
        required: true
    },
    ta:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    time:{
        type: Date,
        required: true
    },
    grade:{
        type: String,
        required: false
    }
})

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;