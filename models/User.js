/**
 * User schema
 */

const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    surname: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{ 
        type: String,
        required: true
    },
    role:{ 
        type: Number, // 0 = Professor, 1 = TA, 2 = Student
        required: true,
        default: 2
    },
    classrooms: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'Classroom'
    }],
    isConfirmed:{
        type: Boolean,
        required: false,
        default: false
    },
    availability:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Availability'
    }],
    classrooms_grades:{
        type: Map,
        required: true,
        default: {}
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
