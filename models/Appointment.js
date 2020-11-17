/**
 * Answer schema
 */

const mongoose =  require('mongoose');

const AppointmentSchema = new mongoose.Schema({
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

const Answer = mongoose.model('Appointment', AppointmentSchema);

module.exports = Answer;