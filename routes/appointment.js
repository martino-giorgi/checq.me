const mongoose = require("mongoose");
const express = require("express");
const moment = require("moment");
require("twix");
const router = express.Router();
const { ensureAuthenticated, ensureProfessor, ensureStudent, ensureTa } = require("../config/auth");

const { get_available_time, get_available_time2 } = require("../updates/available_time");

const { increaseTa } = require("../updates/db_updates");

const User = require("../models/User");
const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const Classroom = require("../models/Classroom");
const { resolve } = require("path");
const { rejects, deepStrictEqual } = require("assert");
const { route } = require("./availability");
const { captureRejectionSymbol } = require("events");

module.exports = router;

//TODO check if user is in classroooooooooom
// router.post("/scheduletest", ensureAuthenticated, ensureStudent, async (req, res) => {
//   let user_id = req.user._id;
//   let mastery_id = req.body.mastery_id;

//   can_mastery(mastery_id, user_id).then((b) => {
//     if (b) {
//       MasteryCheck.findById(mastery_id)
//         .select({ classroom: 1, appointment_duration: 1 })
//         .populate({ path: "classroom" })
//         .then((mastery) => {
//           ClassroomMasteryDay.find({ classroom: mastery.classroom._id }).then((mastery_days) => {
//             let assigned_ta = mastery.classroom.ta_mapping.get(user_id.toString());
//             let booked = false;
//             let weeks = 0;
            
//             while (!booked) {
//               for (let i = 0; i < mastery_days.length && !booked; i++) {
//                 m_day = mastery_days[i];
//                 let m_day_start;
//                 let m_day_end;

//                 if (moment().isoWeekday() <= m_day.iso_day_n) {
//                   // then just give me this week's instance of that day
//                   m_day_start = moment().add(weeks, "weeks").isoWeekday(m_day.iso_day_n);
//                   m_day_end = moment().add(weeks, "weeks").isoWeekday(m_day.iso_day_n);
//                 } else {
//                   // otherwise, give me *next week's* instance of that same day
//                   m_day_start = moment()
//                     .add(1 + weeks, "weeks")
//                     .isoWeekday(m_day.iso_day_n);
//                   m_day_end = moment()
//                     .add(1 + weeks, "weeks")
//                     .isoWeekday(m_day.iso_day_n);
//                 }

//                 m_day_start = m_day_start.set({
//                   hour: moment(m_day.start_time).get("hour"),
//                   minute: moment(m_day.start_time).get("minute"),
//                   second: 0,
//                 });

//                 m_day_end = m_day_end.set({
//                   hour: moment(m_day.end_time).get("hour"),
//                   minute: moment(m_day.end_time).get("minute"),
//                   second: 0,
//                 });
//                 console.log(
//                   "Start: " + moment(m_day_start).toDate() + ", End:" + moment(m_day_end).toDate()
//                 );

//                 console.log(assigned_ta);

//                 get_day_busy(assigned_ta, m_day_end)
//                   .then((avail) => {
//                     console.log("Busy slots:", avail);
//                     console.log(mastery.appointment_duration);
//                     trybooking(
//                       assigned_ta,
//                       mastery_id,
//                       m_day_start,
//                       m_day_end,
//                       mastery.appointment_duration,
//                       req.user._id,
//                       typeof avail[0].busy === 'undefined' ? [] : avail[0].busy
//                     ).then((r) => {
//                       console.log(r);
//                       if (r != false) {
//                         //booking completed.
//                         booked = true;
//                         increaseTa(req.user._id, mastery.classroom._id);
//                         res.json(r);
//                       } else {
//                         let staff = [mastery.classroom.lecturer];
//                         mastery.classroom.teaching_assistants.forEach((el) =>
//                           staff.push(mongoose.Types.ObjectId(el))
//                         );

//                         get_TA_queue(m_day_start, staff, assigned_ta).then((queue) => {
//                           for (let j = 0; j < queue.length && !booked; j++) {
//                             get_day_busy(queue[j]._id, m_day_end)
//                               .then((avail2) => {
//                                 // available_slots = get_avail_slots(m_day_start, m_day_end, m_day.iso_day_n, avail2);
//                                 trybooking(
//                                   queue[j]._id,
//                                   mastery_id,
//                                   m_day_start,
//                                   m_day_end,
//                                   mastery.appointment_duration,
//                                   req.user._id,
//                                   typeof avail2[0].busy === 'undefined' ? [] : avail2[0].busy
//                                 ).then((x) => {
//                                   if (x != false) {
//                                     // booking completed
//                                     booked = true;
//                                     res.json(x);
//                                   }
//                                 });
//                               })
//                               .catch((err) => {
//                                 console.log(err);
//                               });
//                           }
//                         });
//                       }
//                     });
//                   })
//                   .catch((err) => {
//                     console.log(err);
//                   });
//               }
//               break;
//               weeks++;
//             }
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.send("error");
//         });
//     } else {
//       res.send("cannot book this mastery").end();
//     }
//   });
// });



router.post("/scheduletest", ensureAuthenticated, ensureStudent, async (req, res) => {
  let user_id = req.user._id;
  let mastery_id = req.body.mastery_id;

  try {

    if (await can_mastery(mastery_id, user_id) == false) {
      res.end();
      return;
    }
    
    let mastery = await MasteryCheck.findById(mastery_id)
      .select({ classroom: 1, appointment_duration: 1 })
      .populate({ path: "classroom" });

    let current_iso_weekday = moment().isoWeekday();
    
    let mastery_days = await ClassroomMasteryDay.find({ classroom: mastery.classroom._id });
    //should be sorted by the closest weekday to today.

    let assigned_ta = mastery.classroom.ta_mapping.get(user_id.toString());
    let booked = false;
    let weeks = 0;

    // while (!booked) {
      for (let i = 0; i < mastery_days.length && !booked; i++){
        // console.log(i);
        m_day = mastery_days[i];
        let m_day_start;
        let m_day_end;

        if (current_iso_weekday <= m_day.iso_day_n) {
          // then just give me this week's instance of that day
          m_day_start = moment().add(weeks, "weeks").isoWeekday(m_day.iso_day_n);
          m_day_end = moment().add(weeks, "weeks").isoWeekday(m_day.iso_day_n);
        } else {
          // otherwise, give me *next week's* instance of that same day
          m_day_start = moment()
            .add(1 + weeks, "weeks")
            .isoWeekday(m_day.iso_day_n);
          m_day_end = moment()
            .add(1 + weeks, "weeks")
            .isoWeekday(m_day.iso_day_n);
        }

        m_day_start = m_day_start.set({
          hour: moment(m_day.start_time).get("hour"),
          minute: moment(m_day.start_time).get("minute"),
          second: 0,
        });

        m_day_end = m_day_end.set({
          hour: moment(m_day.end_time).get("hour"),
          minute: moment(m_day.end_time).get("minute"),
          second: 0,
        });

        // console.log(m_day_start, m_day_end);

    //     console.log(m_day_start);
        // if(m_day_start.isAfter(moment())){
          let avail = await get_day_busy(assigned_ta, m_day_end);
          // console.log(avail);
          let r = await trybooking(
            assigned_ta,
            mastery_id,
            m_day_start,
            m_day_end,
            mastery.appointment_duration,
            req.user._id,
            typeof avail[0] === 'undefined' ? [] : avail[0].busy
          )
  
          if (r != false) {
            //booking completed.
            booked = true;
            increaseTa(req.user._id, mastery.classroom._id);
            res.json(r);
          }
          else {
            let staff = [mastery.classroom.lecturer];
            mastery.classroom.teaching_assistants.forEach((el) => {
              staff.push(mongoose.Types.ObjectId(el))
            });
  
            let queue = await get_TA_queue(m_day_start, staff, assigned_ta);

  
            for (let j = 0; j < queue.length && !booked; j++) {
              let avail2 = await get_day_busy(queue[j]._id, m_day_end);
              let x = await trybooking(
                queue[j]._id,
                mastery_id,
                m_day_start,
                m_day_end,
                mastery.appointment_duration,
                req.user._id,
                typeof avail2[0] === 'undefined' ? [] : avail2[0].busy
              )
              if (x != false) {
                // booking completed
                res.json(x);
                booked = true;
                break;
              }
            }
          }
        }
    //   }

    //   // break;
    //   weeks++;
    // }
    res.send().end();
  } catch(err) {
    console.log(err);
    res.send("you cannot book this mastery!").end();
    return;
  }
});

router.get("/canbook", (req, res) => {
  Availability.aggregate()
    .unwind("$busy")
    .match({
      _userId: mongoose.Types.ObjectId("5fb4351a1cf7e5fab846ca09"),
      $and: [
        { "busy.0": { $lte: moment("2020-12-03").endOf("day").toDate() } },
        { "busy.1": { $gte: moment("2020-12-03").startOf("day").toDate() } },
      ],
    })
    .group({ _id: "$_userId", busy: { $addToSet: "$busy" } })
    .exec((err, result) => {
      console.log(result);
    });
  res.end();
});

async function get_day_busy(user_id, date) {
  return new Promise((resolve, rejects) => {
    let d = moment(date);
    Availability.aggregate()
      .unwind("$busy")
      .match({
        _userId: user_id,
        $and: [
          { "busy.0": { $lte: d.endOf("day").toDate() } },
          { "busy.1": { $gte: d.startOf("day").toDate() } },
        ],
      })
      .group({ _id: "$_userId", busy: { $addToSet: "$busy" } })
      .exec((err, avail) => {
        if (err) {
          rejects(err);
          console.log(err);
        } else {
          resolve(avail);
        }
      });
  });
}

async function trybooking(ta, mastery_id, m_day_start, m_day_end, m_duration, student_id, busy) {
  // console.log(m_duration);
  console.log("Attempting to book "+ student_id+ " for "+ mastery_id+ " with: "+ ta)
  return new Promise((resolve, rejects) => {
    Appointment.aggregate()
      .match({
        _taId: ta,
        start_time: { $lte: m_day_end.toDate() },
        end_time: { $gt: m_day_start.toDate() },
      })
      .exec((err, appointments) => {
        if (err) {
          console.log(err);
          rejects(err);
          return;
        } else {
          let busy_total = busy;
          appointments.forEach((el) => {
            busy_total.push([el.start_time, el.end_time]);
          });
          // console.log(m_day_start, m_day_end, busy_total);
          let availability = get_available_time2(m_day_start, m_day_end, busy_total, m_duration);
          console.log("Busy slots: ")
          console.log(busy_total);
          console.log("Availability: ");
          console.log(availability);

          if (availability.length == 0) {
            resolve(false);
            console.log("Booking failed!")
            return;
          } else {
            end_time_appointment = availability[0].start.clone();
            end_time_appointment.add(m_duration, "minutes");
            const new_appointment = new Appointment({
              _masteryId: mastery_id,
              _taId: ta,
              _studentId: student_id,
              start_time: availability[0].start,
              end_time: end_time_appointment,
              duration: m_duration,
            });
            new_appointment
              .save()
              .then(() => {
                resolve(new_appointment);
                console.log("Booking successful!");
                return;
              })
              .catch((err) => {
                console.log(err);
                rejects(err);
                return;
              });
          }
        }
      });
  });
}

router.get("/taqueue", (req, res) => {
  get_TA_queue(
    moment("2020-12-02"),
    [
      mongoose.Types.ObjectId("5fbbbd26278c90520deec26c"),
      mongoose.Types.ObjectId("5fb435501cf7e5fab846ca0b"),
      mongoose.Types.ObjectId("5fb4351a1cf7e5fab846ca09"),
    ],
    [mongoose.Types.ObjectId("5fb4351a1cf7e5fab846ca09")]
  );
  res.end();
});

async function get_TA_queue(date, classroom_tas, exclude) {
  return new Promise((resolve, rejects) => {
    const date_start = moment(date).startOf("day");
    // console.log(classroom_tas, exclude);
    Appointment.aggregate()
      .match({
        $and: [{ _taId: { $in: classroom_tas } }, { _taId: { $ne: exclude } }],
      })
      .group({
        _id: "$_taId",
        count: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $gte: ["$start_time", date_start.toDate()] },
                  { $lte: ["$end_time", date_start.endOf("day").toDate()] },
                ],
              },
              1,
              0,
            ],
          },
        },
      })
      .sort("count")
      .exec((err, result) => {
        if(err){
          rejects(err);
          return;
        }
        if(result.length != classroom_tas.length - 1){
          new_res = []
          classroom_tas.forEach(ta => {
            if(ta != exclude && !result.some(e => e._id == ta)){
              new_res.push({_id:ta,count:0});
            }
          })
          result.forEach(e => new_res.push(e));
        }
        console.log("Queue: ");
        console.log(new_res);
        resolve(new_res);
      });
  });
}

async function can_mastery(mastery_id, user_id) {
  return new Promise((resolve, rejects) => {
    Appointment.find({ _masteryId: mastery_id, _studentId: user_id }).then((ap) => {
      if (ap.length > 0) {
        resolve(false);
        return;
      } else {
        MasteryCheck.findById(mastery_id)
          .populate({ path: "classroom", select: ["is_ordered_mastery"] })
          .then((ordered) => {
            if (ordered != null) {
              if(ordered.avalable == false){
                resolve(false)
                return;
              }
              if (ordered.classroom.is_ordered_mastery == false || ordered.locked_by == undefined) {
                resolve(true);
                return;
              } else {
                User.findById(user_id)
                  .select({ classrooms_grades: 1 })
                  .exec((err, c_grades) => {
                    if (err) {
                      console.log("error getting grades of user: " + user_id);
                      rejects(false);
                      return;
                    } else {
                      if (c_grades[ordered.classroom].includes(ordered.locked_by)) {
                        resolve(true);
                        return;
                      } else {
                        resolve(false);
                        return;
                      }
                    }
                  });
              }
            }
          })
          .catch((err) => rejects(err));
      }
    });
  });
}

router.get("/aaa", (req, res) => {
  get_available_time("2020-12-03T10:30", "2020-12-03T14:30", [
    ["2020-12-03T12:31", "2020-12-03T13:29"],
    ["2020-12-03T09:30", "2020-12-03T10:30"],
  ]);
});

// TODO: Cambia nome prima di committare!!
router.post("/sgrang", (req, res) => {
  console.log(req.body);
  let date_start = moment(req.body.start_time, "YYYY-MM-DDTHH:mm", true);
  let date_end = moment(req.body.end_time, "YYYY-MM-DDTHH:mm", true);
  let now = moment();
  let ok = true;
  // if (!date_start.isValid || date_start.isAfter(now) <= 0) {
  //   ok = false;
  // }
  if (ok) {
    const new_app = new Appointment({
      _masteryId: req.body._masteryId,
      _taId: req.body._taId,
      _studentId: req.body._studentId,
      start_time: date_start,
      end_time: date_end,
      duration: req.body.duration,
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
