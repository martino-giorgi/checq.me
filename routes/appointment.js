const mongoose = require("mongoose");
const express = require("express");
const moment = require("moment");
require("twix");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
  ensureProfOrTA,
} = require("../config/auth");

const { get_available_time, get_available_time2 } = require("../updates/available_time");

const { increaseTa } = require("../updates/db_updates");

const User = require("../models/User");
const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const Classroom = require("../models/Classroom");

module.exports = router;

router.post("/scheduletest", ensureAuthenticated, ensureStudent, async (req, res) => {
  let user_id = req.user._id;
  let mastery_id = req.body.mastery_id;

  try {
    if ((await can_mastery(mastery_id, user_id)) == false) {
      res.end();
      return;
    }

    let mastery = await MasteryCheck.findById(mastery_id)
      .select({ classroom: 1, appointment_duration: 1 })
      .populate({ path: "classroom" });

    let current_iso_weekday = moment().isoWeekday();

    let mastery_days = sort_mastery_days(
      await ClassroomMasteryDay.find({ classroom: mastery.classroom._id })
    );

    let assigned_ta = mastery.classroom.ta_mapping.get(user_id.toString());
    let booked = false;
    let weeks = 0;

    while (!booked) {
      for (let i = 0; i < mastery_days.length && !booked; i++) {
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

        if (m_day_start.isAfter(moment())) {
          let avail = await get_day_busy(assigned_ta, m_day_end);
          let r = await trybooking(
            assigned_ta,
            mastery_id,
            m_day_start,
            m_day_end,
            mastery.appointment_duration,
            req.user._id,
            typeof avail[0] === "undefined" ? [] : avail[0].busy
          );

          if (r != false) {
            //booking completed.
            booked = true;
            increaseTa(req.user._id, mastery.classroom._id);
            res.json(r);
            return;
          } else {
            let staff = [mastery.classroom.lecturer];
            mastery.classroom.teaching_assistants.forEach((el) => {
              staff.push(mongoose.Types.ObjectId(el));
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
                typeof avail2[0] === "undefined" ? [] : avail2[0].busy
              );
              if (x != false) {
                // booking completed
                res.json(x);
                booked = true;
                return;
              }
            }
          }
        }
      }
      weeks++;
    }

    res.send().end();
  } catch (err) {
    console.log(err);
    res.send("you cannot book this mastery!").end();
    return;
  }
});

function sort_mastery_days(mastery_days) {
  let x = mastery_days.sort(function (a, b) {
    let x = a["iso_day_n"];
    let y = b["iso_day_n"];
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  let d = moment().isoWeekday();
  // let d = 3;

  let i;
  for (i = 0; i < x.length; i++) {
    console.log(x[i].iso_day_n > d);
    if (x[i].iso_day_n > d) {
      break;
    }
  }

  if (i == 0 || i == x.length - 1) {
    return x;
  }

  let sorted = [];

  for (let j = i; j < x.length; j++) {
    sorted.push(x[j]);
  }

  for (let k = 0; k < i; k++) {
    sorted.push(x[k]);
  }

  return sorted;
}

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
  console.log("Attempting to book " + student_id + " for " + mastery_id + " with: " + ta);
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
          console.log("Busy slots: ");
          console.log(busy_total);
          console.log("Availability: ");
          console.log(availability);

          if (availability.length == 0) {
            resolve(false);
            console.log("Booking failed!");
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
        if (err) {
          rejects(err);
          return;
        }
        if (result.length != classroom_tas.length - 1) {
          let new_res = [];
          classroom_tas.forEach((ta) => {
            if (ta.toString() != exclude.toString() && !result.some((e) => e._id == ta)) {
              new_res.push({ _id: ta, count: 0 });
            }
          });
          result.forEach((e) => new_res.push(e));
          console.log("Queue no appoinments");
          console.log(new_res);
          resolve(new_res);
        } else {
          console.log("Queue normal");
          console.log(result);
          resolve(result);
        }
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
              if (ordered.avalable == false) {
                resolve(false);
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

router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role == 2) {
    Appointment.find({ _studentId: req.user._id })
      .populate({ path: "_masteryId", select: ["name", "description", "classroom"] })
      .populate({ path: "_taId", select: ["name", "surname"] })
      .then((ap) => {
        res.json(ap);
      });
  } else if (req.user.role == 0 || req.user.role == 1) {
    let total = {};
    Appointment.find({ _taId: req.user._id })
      .populate({ path: "_masteryId", select: ["name", "description", "classroom"] })
      .populate({ path: "_studentId", select: ["name", "surname"] })
      .then((ap) => {
        total["appointments"] = ap;
        Availability.findOne({ _userId: req.user._id }).then((avail) => {
          total["busy"] = avail;
          res.json(total);
        });
      });
  } else {
    res.status(400).end();
  }
});

router.delete("/:appointment_id", ensureProfOrTA, (req, res) => {
  Appointment.findOneAndDelete({ _id: req.params.appointment_id })
    .then(() => {
      res.status(400).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).end();
    });
});

// router.patch("/",ensureProfOrTA, (req,res) => {
//   if(!req.body.start_date || !req.body.end_date || !req.body.appointment_id){
//     let b = moment(end_date);
//     let a = moment(start_date);
//     if(a.isValid && b.isValid && b.isAfter(a) && a.isAfter(moment())) {}
//     // Appointment.findOneAndUpdate({_id: req.body.appointment_id}, {})

//   }
// })

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
