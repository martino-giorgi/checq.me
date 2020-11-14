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
    classrooms:{
        type: Array,
        required: false,
        default: []
    },
    isConfirmed:{
        type: Boolean,
        required: false,
        default: false
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;