/**
 * Answer schema
 */

const mongoose =  require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    _masteryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'MasteryCheck',
        required: true
    },
    _taId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    _studentId:{
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

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;