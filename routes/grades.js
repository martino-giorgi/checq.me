const express = require("express");
const crypto = require("crypto");
const moment = require("moment");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
const {
    ensureAuthenticated,
    ensureProfessor,
    ensureProfOrTA,
    ensureMemberOfClass,
    ensureProfessorUser
} = require("../config/auth");

const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const TokenClassroom = require("../models/TokenClassroom");
const Appointment = require("../models/Appointment");
const ClassroomGrades = require("../models/ClassroomGrades");
const Attempt = require("../models/Attempt");

module.exports = router;

// appointment_id, Classroom_id, Student_id, TA/Prof_id, mastery_id (take topics from there), array of topic grades, final grade
router.put('/', ensureProfOrTA, (req, res) => {
    Appointment.findById(req.body.appointment_id).then(appointment => {
        // checks appointment belongs to the TA or is a professor
        if (appointment._taId.equals(req.user._id) || req.user.role === 0) {
            // check if end_time of appointment is after today date
            if (moment(appointment.end_time).isBefore(moment())) {
                console.log("date is okay")

                // find the user
                User.findById(appointment._studentId)
                    .populate("classrooms_grades")
                    .then(user => {
                        // grades object id for this class
                        let grades_id = user.classrooms_grades.get(req.query.classroom_id);
                        ClassroomGrades.findById(grades_id).then(classroom_grades => {
                                let new_attempt = new Attempt({
                                    _mastery_id: req.body.mastery_id, 
                                    topic_grades: req.body.topic_grades,
                                    final_grade: req.body.final_grade
                                })
                                // check if masterycheck_id is in the map
                                if (classroom_grades.mastery_grades.get(req.body.mastery_id)) {
                                    console.log("c'e gia");
                                    classroom_grades.mastery_grades.get(req.body.mastery_id).push(new_attempt);
                                    
                                }
                                // if there's not a mapping for this mastery check ( first attempt ) mastery_id => Attempts[]
                                else {
                                    console.log(classroom_grades._id);
                                    let attempts = [new_attempt]; 
                                    classroom_grades.mastery_grades.set(req.body.mastery_id, attempts); 
                                }
                                console.log(classroom_grades);
                                user.save(); // TODO: non va nulla :)
                                res.status(200).end();
                            })
                    })

            } else {
                console.log("appointment is in the future")
                res.status(402).end();
            }
        } else {
            console.log("user is not the correct TA");
            res.status(403).end();
            return;
        }
    })
        .catch(result => {
            console.log(result);
            res.status(400).end();
        })
})

// const ClassroomGradesSchema = new mongoose.Schema({
//     _userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     _classroomId:{
//         type: mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref: 'Classroom'
//     },
//     mastery_grades:{ mastery_id -> { topic_map: {map topic_id -> grade}, final_grade: int }
//       type:Map,
//       required:true,
//       default: {}
//     }
//   });