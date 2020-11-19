/**
 * Classroom schema
*/

const mongoose =  require('mongoose');
const User = require("./User");
const Topic = require("./Topic");
const MasteryCheck = require("./MasteryCheck");

const ClassroomSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    lecturer: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    },
    teaching_assistants: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }],
    partecipants: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }],
    is_ordered_mastery: {
        type: Boolean,
        required: true
    }, 
    mastery_checks: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'MasteryCheck'
    }],
    color: {
        type: String,
        required: true
    },
    university_domain: {
        type: String,
        required: false
    }
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;

