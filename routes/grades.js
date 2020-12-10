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
const MasteryCheck = require("../models/MasteryCheck");

module.exports = router;

/**
 * Route to add an attempt to a specific masterycheck
 * @name post/grades?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/', ensureProfOrTA, (req, res) => {
    Appointment.findById(req.body.appointment_id).then(appointment => {
        // checks appointment belongs to the TA or is a professor
        if (appointment._taId.equals(req.user._id) || req.user.role === 0) {
            // check if end_time of appointment is after today date
            if (moment(appointment.end_time).isBefore(moment())) {
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
                                    let x = classroom_grades.mastery_grades.get(req.body.mastery_id)
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

// return the grades of a classroom for a given user. user must be in the professor's classroom
// returns a map |  mastery_id -> [Attempts]
// Todo: populate!      

router.get("/", ensureProfOrTA, (req, res) => {
    User.findById(req.query.student_id)
    .populate("classrooms_grades")
    .then(user => {
        ClassroomGrades.findById(user.classrooms_grades.get(req.query.classroom_id))
        .then(grades => {
            // grades for this classroom of this student
            res.json(grades.mastery_grades)
        })
        
    })
});

/*

                                   _
                                 ,d8b,
                         _,,aadd8888888bbaa,,_
                    _,ad88P"""8,  I8I  ,8"""Y88ba,_
                 ,ad88P" `Ya  `8, `8' ,8'  aP' "Y88ba,
               ,d8"' "Yb   "b, `b  8  d' ,d"   dP" `"8b,
              dP"Yb,  `Yb,  `8, 8  8  8 ,8'  ,dP'  ,dP"Yb
           ,ad8b, `Yb,  "Ya  `b Y, 8 ,P d'  aP"  ,dP' ,d8ba,
          dP" `Y8b, `Yb, `Yb, Y,`8 8 8',P ,dP' ,dP' ,d8P' "Yb
         ,88888888Yb, `Yb,`Yb,`8 8 8 8 8',dP',dP' ,dY88888888,
         dP     `Yb`Yb, Yb,`8b 8 8 8 8 8 d8',dP ,dP'dP'     Yb
        ,8888888888b "8, Yba888888888888888adP ,8" d8888888888,
        dP        `Yb,`Y8P""'             `""Y8P',dP'        Yb
       ,88888888888P"Y8P'_.---.._     _..---._`Y8P"Y88888888888,
       dP         d'  8 '  ____  `. .'  ____  ` 8  `b         Yb
      ,888888888888   8   <(@@)>  | |  <(@@)>   8   888888888888,
      dP          8   8    `"""         """'    8   8          Yb
     ,8888888888888,  8          ,   ,          8  ,8888888888888,
     dP           `b  8,        (.-_-.)        ,8  d'           Yb
    ,88888888888888Yaa8b      .'       `.      d8aaP88888888888888,
    dP               ""8b     _,gd888bg,_     d8""               Yb
   ,888888888888888888888b,    ""Y888P""    ,d888888888888888888888,
   dP                   "8"b,             ,d"8"                   Yb
  ,888888888888888888888888,"Ya,_,ggg,_,aP",888888888888888888888888,
  dP                      "8,  "8"\x/"8"  ,8"                      Yb
 ,88888888888888888888888888b   8\\x//8   d88888888888888888888888888,
 8888bgg,_                  8   8\\x//8   8                  _,ggd8888
  `"Yb, ""8888888888888888888   Y\\x//P   8888888888888888888"" ,dP"'
    _d8bg,_"8,              8   `b\x/d'   8              ,8"_,gd8b_
  ,iP"   "Yb,8888888888888888    8\x/8    8888888888888888,dP"  `"Yi,
 ,P"    __,888              8    8\x/8    8              888,__    "Y,
,8baaad8P"":Y8888888888888888 aaa8\x/8aaa 8888888888888888P:""Y8baaad8,
dP"':::::::::8              8 8::8\x/8::8 8              8:::::::::`"Yb
8::::::::::::8888888888888888 8::88888::8 8888888888888888::::::::::::8
8::::::::::::8,             8 8:::::::::8 8             ,8::::::::::::8
8::::::::::::8888888888888888 8:::::::::8 8888888888888888::::::::::::8
8::::::::::::Ya             8 8:::::::::8 8             aP::::::::::::8
8:::::::::::::888888888888888 8:::::::::8 888888888888888:::::::::::::8
8:::::::::::::Ya            8 8:::::::::8 8            aP:::::::::::::8
Ya:::::::::::::88888888888888 8:::::::::8 88888888888888:::::::::::::aP
`8;:::::::::::::Ya,         8 8:::::::::8 8         ,aP:::::::::::::;8'
 Ya:::::::::::::::"Y888888888 8:::::::::8 888888888P":::::::::::::::aP
 `8;::::::::::::::::::::""""Y8888888888888P""""::::::::::::::::::::;8'
  Ya:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::aP
   "b;::::::::::::::::::::::::::::::::::::::::::: Normand  ::::::;d"
    `Ya;::::::::::::::::::::::::::::::::::::::::: Veilleux ::::;aP'
      `Ya;:::::::::::::::::::::::::::::::::::::::::::::::::::;aP'
         "Ya;:::::::::::::::::::::::::::::::::::::::::::::;aP"
            "Yba;;;:::::::::::::::::::::::::::::::::;;;adP"
                `"""""""Y888888888888888888888P"""""""'

*/

// for (const key of user.classrooms_grades) {
            
//     let classroom = key[0];
//     let classroom_grames = key[1]
// }