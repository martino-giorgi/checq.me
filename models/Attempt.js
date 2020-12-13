const mongoose =  require('mongoose');

const AttemptSchema = new mongoose.Schema({

    _mastery_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "MasteryCheck",
    },
    topic_grades: {
        type: Map,
        required: true,
        default: {}
    },
    final_grade: {
        type: Number,
        required: true
    }
})

const Attempt = mongoose.model('Attempt', AttemptSchema)

module.exports = Attempt;