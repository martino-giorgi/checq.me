/**
 * Classroom schema
 */

const mongoose =  require('mongoose');
const User = require("./User");
const Topic = require("./Topic");

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
        type: User,
        required: true
    },
    teaching_assistants: {
        type: [User],
        required: false
    },
    topics: {
        type: [Topic],
        required: true
    }

});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;

