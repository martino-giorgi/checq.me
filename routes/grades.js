const express = require('express');
const crypto = require('crypto');
const moment = require('moment');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const {
  ensureAuthenticated,
  ensureStudent,
  ensureProfOrTA,
  ensureMemberOfClass,
} = require('../config/auth');

const ClassroomMasteryDay = require('../models/ClassroomMasteryDay');
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const TokenClassroom = require('../models/TokenClassroom');
const Appointment = require('../models/Appointment');
const ClassroomGrades = require('../models/ClassroomGrades');
const Attempt = require('../models/Attempt');
const MasteryCheck = require('../models/MasteryCheck');

module.exports = router;

/**
 * Route to add an attempt to a specific masterycheck
 * @name post/grades?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

router.put('/', ensureAuthenticated, ensureProfOrTA, (req, res) => {
  Appointment.findById(req.body.appointment_id)
    .then((appointment) => {
      if (appointment.isGraded) {
        res.status(400).end();
        return;
      }
      // checks appointment belongs to the TA or is a professor
      if (appointment._taId.equals(req.user._id) || req.user.role === 0) {
        // check if end_time of appointment is after today date
        if (moment(appointment.end_time).isBefore(moment())) {
          // find the user
          User.findById(appointment._studentId)
            .populate('classrooms_grades')
            .then((user) => {
              // grades object id for this class
              let grades_id = user.classrooms_grades.get(req.query.classroom_id);
              ClassroomGrades.findById(grades_id).then((classroom_grades) => {
                let new_attempt = new Attempt({
                  _mastery_id: req.body.mastery_id,
                  topic_grades: req.body.topic_grades,
                  final_grade: req.body.final_grade,
                });
                // check if masterycheck_id is in the map
                if (classroom_grades.mastery_grades.get(req.body.mastery_id)) {
                  let x = classroom_grades.mastery_grades.get(req.body.mastery_id);
                  x.push(new_attempt);
                  classroom_grades.markModified('mastery_grades');
                }
                // if there's not a mapping for this mastery check ( first attempt ) mastery_id => Attempts[]
                else {
                  console.log(classroom_grades._id);
                  let attempts = [new_attempt];
                  classroom_grades.mastery_grades.set(req.body.mastery_id, attempts);
                }

                classroom_grades.save();
                console.log(classroom_grades);
                appointment.isGraded = true;
                appointment.save().then(() => {
                  res.status(200).end();
                });
              });
            });
        } else {
          console.log('appointment is in the future');
          res.status(402).end();
        }
      } else {
        console.log('user is not the correct TA');
        res.status(403).end();
        return;
      }
    })
    .catch((result) => {
      console.log(result);
      res.status(400).end();
    });
});

// return the grades of a classroom for a given user. user must be in the professor's classroom
// returns a map |  mastery_id -> [Attempts]
// Todo: populate!

router.get('/student', ensureAuthenticated, ensureProfOrTA, (req, res) => {
  User.findById(req.query.student_id)
    .populate('classrooms_grades')
    .then((user) => {
      ClassroomGrades.findById(user.classrooms_grades.get(req.query.classroom_id)).then(
        (grades) => {
          Classroom.findById(grades._classroomId).then((classroom) => {
            // grades for this classroom of this student
            let promises = [];
            classroom.mastery_checks.forEach((m_id) => {
              promises.push(MasteryCheck.findById(m_id));
            });
            Promise.all(promises).then((results) => {
              let grades_array = [];
              results.forEach((mastery) => {
                grades_array.push({
                  mastery_name: mastery.name,
                  topic: grades.mastery_grades.get(mastery._id.toString()),
                });
              });
              User.findById(req.query.student_id).then((student) => {
                let new_grades = {
                  mastery_grades: grades_array,
                  _id: grades._id,
                  _userId: grades._userId,
                  _classroomId: grades._classroomId,
                  name: classroom.name,
                  user_name: student.name,
                  user_surname: student.surname,
                };
                res.render('grades', {
                  model: {
                    user: req.user,
                    grades: new_grades,
                  },
                });
              });
            });
          });
        }
      );
    });
});

router.get('/', ensureAuthenticated, ensureMemberOfClass, (req, res) => {
  ClassroomGrades.findById(req.user.classrooms_grades.get(req.query.classroom_id))
    .populate()
    .then((grades) => {
      Classroom.findById(grades._classroomId).then((classroom) => {
        // grades for this classroom of this student
        let promises = [];
        classroom.mastery_checks.forEach((m_id) => {
          promises.push(MasteryCheck.findById(m_id));
        });
        Promise.all(promises).then((results) => {
          let grades_array = [];
          results.forEach((mastery) => {
            grades_array.push({
              mastery_name: mastery.name,
              topic: grades.mastery_grades.get(mastery._id.toString()),
            });
          });
          let new_grades = {
            mastery_grades: grades_array,
            _id: grades._id,
            _userId: grades._userId,
            _classroomId: grades._classroomId,
            name: classroom.name,
            user_name: req.user.name,
            user_surname: req.user.surname,
          };
          res.render('grades', {
            model: {
              user: req.user,
              grades: new_grades,
            },
          });
        });
      });
    });
});

router.get('/add', ensureAuthenticated, ensureProfOrTA, (req, res) => {
  res.render('manager/mastery/add_grade', { user: req.user });
});
