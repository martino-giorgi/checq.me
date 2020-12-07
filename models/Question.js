/**
 * Question schema
 */

const mongoose =  require('mongoose');
const Answer = require('./Answer');

// ENUM: types of questions;
// - open: needs to be checked by a professor/TA
// - direct: can be checked automatically
// - code: can be checked by a professor/TA ( optionally run )

const QuestionSchema = new mongoose.Schema({
    // type: {
    //     type: String,
    //     enum : ['direct','open', 'code'],
    //     default: 'direct',
    //     required: true
    // },
    // title: {
    //     type: String,
    //     required: true
    // },
    lang: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    answer: {
        type: Array,
        required: true
    },
    topic: {
        type: mongoose.Schema.ObjectId,
        ref: "Topic",
        required: true
    },
    classroom: {
        type: mongoose.Schema.ObjectId,
        ref: "Classroom",
        required: true,
    }
})



const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;