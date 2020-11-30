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
const Classroom = require("../models/Classroom");

module.exports = router;

//TODO check if user is in classroooooooooom
router.post("/scheduletest", ensureAuthenticated, ensureStudent, (req, res) => {
  let user_id = req.user._id;
  let mastery_id = req.body.mastery_id;
  
  can_mastery(mastery_id, user_id).then((b) => {
    if (b) {
      MasteryCheck.findById(mastery_id)
        .select({ classroom: 1 })
        .populate({ path: "classroom" })
        .then((mastery) => {
          ClassroomMasteryDay.find({ classroom: mastery.classroom._id }).then(
            (mastery_days) => {

              let assigned_ta = mastery.classroom.ta_mapping.get(user_id.toString());

                mastery_days.forEach((m_day) => {
                let m_day_start;
                let m_day_end;

                if (moment().isoWeekday() <= m_day.iso_day_n) {
                  // then just give me this week's instance of that day
                  m_day_start = moment().isoWeekday(m_day.iso_day_n);
                  m_day_end = moment().isoWeekday(m_day.iso_day_n);
                } else {
                  // otherwise, give me *next week's* instance of that same day
                  m_day_start = moment()
                    .add(1, "weeks")
                    .isoWeekday(m_day.iso_day_n);
                  m_day_end = moment()
                    .add(1, "weeks")
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

                get_avail_slots(assigned_ta, m_day_start, m_day_end, m_day.iso_day_n);
              });
            }
          );
        })
        .catch((err) => {
          console.log(err);
          res.send("error");
        });
    } else {
      res.send("cannot book this mastery").end();
    }
  });
});

// Waiting for better name
function get_avail_slots(ta_id, m_day_start, m_day_end, m_iso_day) {
  let available_slots = [];
    console.log("TA ID: "+ta_id);
  Availability.findOne({ _userId: ta_id }).then((avail) => {
    console.log("AVAILABILITY: "+avail);
    console.log("BUSY: "+avail.busy);
    avail.busy.forEach((slot) => {
      let start = moment(slot[0]);
      let end = moment(slot[1]);

      if (start.isoWeekday() == m_iso_day && end.isoWeekday() == m_iso_day) {
        if(start.isBefore(m_day_start) && end.isBefore(m_day_end)){
          // possible slot @ end
          available_slots.push([end, m_day_end]);
        } else if(start.isAfter(m_day_start) && end.isBefore(m_day_end)){
          // possible slot @ beginning and @ end
          available_slots.push([m_day_start, start, end, m_day_end]);
        } else if(start.isAfter(m_day_start) && end.isAfter(m_day_end)){
          // possible slot @ start
          available_slots.push([m_day_start, start]);
        }
      } else if (start.isoWeekday() != m_iso_day && end.isoWeekday() == m_iso_day) {
        if (end.isBefore(m_day_start)) {
          // possible slot from m_day_begin
          available_slots.push([m_day_start, m_day_end]);
        } else if (end.isAfter(m_day_start) && end.isBefore(m_day_end)) {
          // possible slot from end
          available_slots.push([end, m_day_end]);
        }
      } else if (start.isoWeekday() == m_iso_day && end.isoWeekday() != m_iso_day) {
        if (start.isAfter(m_day_start) && start.isBefore(m_day_end)) {
          // possible slot form m_day_start to start
          available_slots.push([mm_day_start, start]);
        } else if (start.isAfter(m_day_end)) {
          // possible slot from m_day_start to m_day_end
          available_slots.push([m_day_start, m_day_end]);
        }
      }
    });
  }).then(() => {
    console.log("AVAILABLE SLOTS: "+available_slots);
  });
}

async function is_available(ta_id) {
  return new Promise((resolve, rejects) => {});
}

async function can_mastery(mastery_id, user_id) {
  return new Promise((resolve, rejects) => {
    MasteryCheck.findById(mastery_id)
      .populate({ path: "classroom", select: ["is_ordered_mastery"] })
      .then((ordered) => {
        if (ordered != null) {
          //   console.log("ORDERED:" + ordered);
          if (
            !ordered.classroom.is_ordered_mastery ||
            ordered.locked_by == undefined
          ) {
            resolve(true);
          } else {
            User.findById(user_id)
              .select({ classrooms_grades: 1 })
              .exec((err, c_grades) => {
                if (err) {
                  console.log("error getting grades of user: " + user_id);
                  rejects(false);
                } else {
                  if (c_grades[ordered.classroom].includes(ordered.locked_by)) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                }
              });
          }
        }
      })
      .catch((err) => rejects(err));
  });
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
