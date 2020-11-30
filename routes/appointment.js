const express = require("express");
const moment = require("moment");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");

const User = require("../models/User");
const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const { resolve } = require("path");
const { rejects } = require("assert");

module.exports = router;

// router.post("/", ensureAuthenticated, (req, res) => {
//   MasteryCheck.findById(req.body.mastery_id)
//     .populate({
//       path: "classroom",
//       select: [
//         "teaching_assistants",
//         "partecipants",
//         "lecturer",
//         "mastery_days",
//         "ta_mapping",
//         "end_date",
//       ],
//     })
//     .select({ topics: 0, __v: 0, author: 0, description: 0 })
//     .then((r) => {
//       if (r.available && r.classroom.partecipants.includes(req.user._id)) {
//         let temp_tas = r.classroom.teaching_assistants;
//         temp_tas.push(r.classroom.lecturer);
//         Appointment.find({ ta: { $in: temp_tas  }, time:  }).then((appointments) => {

//           let count = {};
//           appointments.forEach(a => {
//             count[a.ta] = (count[a.ta] || 0)+1;
//           })
//           temp_tas.forEach(el => {
//             if(!count[el]){
//               count[el] = 0;
//             }
//           });

//           let avg_app;
//           appointments.forEach(a => {
//             avg_app += count[a.ta];
//           })
//           avg_app = avg_app / temp_tas.length;

//           let choosen_ta; //the choosen one OMG
//           if(count[r.ta_mapping[req.body.id]] > avg_app){
            
//           }
//           else {
//             choosen_ta = r.ta_mapping[req.body._id];
//             //TODO INCREASE TA IN MAPPING
//           }
          
//           console.log(count);
//           res.status(400).end();
//         });
//       } else {
//         res.status(400).end();
//       }
//     });
// });


// async function getAvailableTa(student_id, tas) {
//   Appointment.find({ ta: { $in: tas } }).then((app) => {
//     var counts = {};
//     app.forEach(function (x) {
//       counts[x] = (counts[x] || 0) + 1;
//     });
//   });
// }

async function can_mastery(mastery_id, user_id){
  return new Promise((resolve, rejects) => {
    MasteryCheck.findById(mastery_id).populate({path: 'classroom', select: ['is_ordered_mastery']}).then(ordered => {
      if(!ordered.classroom.is_ordered_mastery || ordered.locked_by == undefined){
        resolve(true);
      }
      else {
        User.findById(user_id).select({classrooms_grades: 1}).exec((err, c_grades) => {
          if(err){
            console.log("error getting grades of user: "+ user_id);
            rejects(false);
          }
          else {
            if(c_grades[ordered.classroom].includes(ordered.locked_by)){
              resolve(true);
            } else {
              resolve(false);
            }
          }
        })
      }
    })
  })
}

// TODO: Cambia nome prima di committare!!
router.post("/sgrang", (req, res) => {
  let date = moment(req.body.time, "YYYY-MM-DDTHH:mm", true);
  let now = moment();
  let ok = true;
  if (!date.isValid || date.isAfter(now) <= 0) {
    ok = false;
  }
  if (ok) {
    const new_app = new Appointment({
      mastery: req.body.mastery,
      ta: req.body.ta,
      student: req.body.student,
      time: date,
    });
    new_app
      .save()
      .then(() => {
        res.json(new_app);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).end();
      });
  }
});
