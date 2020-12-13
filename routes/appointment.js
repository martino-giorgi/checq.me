const mongoose = require("mongoose");
const express = require("express");
const moment = require("moment");
require("twix");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureStudent,
  ensureProfOrTA,
  ensureProfOrTAUser,
} = require("../config/auth");

const { get_available_time2 } = require("../updates/available_time");

const { increaseTa } = require("../updates/db_updates");

const User = require("../models/User");
const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const Classroom = require("../models/Classroom");
const { json } = require("express");

module.exports = {
  router: router,
  book: book,
};

const MAX_ATTEMPTS = 15;

router.post("/book", ensureAuthenticated, ensureStudent, async (req, res) => {
  book(req.user._id, req.body.mastery_id).then((response) => {
    if (response.status == 200) {
      res.status(200).json(response.element);
    } else {
      res.status(response.status).send(response.send);
    }
  });
});

/**
 * books an appointment(mastery check) for the given student
 * @param String user_id
 * @param String mastery_id
 */
async function book(user_id, mastery_id) {
  if (mastery_id == "") {
    return { status: 400, send: "Select a mastery check first" };
  }

  try {
    if ((await can_mastery(mastery_id, user_id)) == false) {
      return { status: 400, send: "You cannot book this mastery check" };
    }
    let mastery = await MasteryCheck.findById(mastery_id)
      .select({ classroom: 1, appointment_duration: 1, question_time: 1 })
      .populate({ path: "classroom" });

    let is_question_time = !mastery.question_time ? false : true;

    let current_iso_weekday = moment().isoWeekday();

    let mastery_days = sort_mastery_days(
      //get mastery days for that class sorted, the closest day to today will be the first
      await ClassroomMasteryDay.find({ classroom: mastery.classroom._id })
    );
    if (mastery_days.length == 0) {
      return {
        status: 400,
        send: "No mastery days are available for this class, contact your professor",
      };
    }
    let assigned_ta = mastery.classroom.ta_mapping.get(user_id.toString());
    let booked = false;
    let weeks = 0;

    while (!booked && weeks < MAX_ATTEMPTS) {
      for (let i = 0; i < mastery_days.length && !booked; i++) {
        m_day = mastery_days[i];
        let m_day_start;
        let m_day_end;

        //find first m_day
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
          //make sure that the m_day is in the future
          let student_busy = await get_student_appointments(m_day_start, m_day_end, user_id); //get appointments of student during the mastery day
          let avail = await get_day_busy(assigned_ta, m_day_end); //get busy days of ta which overlap mastery day
          let r = await trybooking(
            //try booking an appointment
            assigned_ta,
            mastery_id,
            m_day_start,
            m_day_end,
            mastery.appointment_duration,
            user_id,
            typeof avail[0] === "undefined" ? [] : avail[0].busy,
            student_busy,
            is_question_time
          );

          if (r != false) {
            //booking completed.
            booked = true;
            increaseTa(user_id, mastery.classroom._id); //increase the assigned TA, only happens if the assigned TA was booked
            return { status: 200, element: r };
          } else {
            let staff = [mastery.classroom.lecturer];
            mastery.classroom.teaching_assistants.forEach((el) => {
              staff.push(mongoose.Types.ObjectId(el));
            });

            let queue = await get_TA_queue(m_day_start, staff, assigned_ta); //get the queue of TAs, sorted by number of appointments on that day

            for (let j = 0; j < queue.length && !booked; j++) {
              //try with all the other TAs, still in the same m_day
              let avail2 = await get_day_busy(queue[j]._id, m_day_end);
              let x = await trybooking(
                queue[j]._id,
                mastery_id,
                m_day_start,
                m_day_end,
                mastery.appointment_duration,
                user_id,
                typeof avail2[0] === "undefined" ? [] : avail2[0].busy,
                student_busy,
                is_question_time
              );
              if (x != false) {
                // booking completed
                booked = true;
                return { status: 200, element: r };
              }
            }
          }
        }
      }
      weeks++;
    }
  } catch (err) {
    console.log(err);
    return { status: 400, send: "you cannot book this mastery!" };
  }
  return { status: 400, send: "Error, too many attempts" };
}

/**
 *
 * @param Map mastery_days
 */
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

  let i;
  for (i = 0; i < x.length; i++) {
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

async function trybooking(
  ta,
  mastery_id,
  m_day_start,
  m_day_end,
  m_duration,
  student_id,
  busy_ta,
  busy_student,
  is_question_time
) {
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
          let busy_total = busy_ta;
          appointments.forEach((el) => {
            busy_total.push([el.start_time, el.end_time]);
          });
          busy_student.forEach((el) => {
            busy_total.push([el.start_time, el.end_time]);
          });
          // console.log(m_day_start, m_day_end, busy_total);
          let availability = get_available_time2(m_day_start, m_day_end, busy_total, m_duration);
          console.log(m_day_start, m_day_end);
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
            if (is_question_time) {
              new_appointment.question = true;
            }
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

async function get_student_appointments(m_day_start, m_day_end, student_id) {
  return new Promise((resolve, rejects) => {
    Appointment.aggregate()
      .match({
        _studentId: student_id,
        start_time: { $lte: m_day_end.toDate() },
        end_time: { $gt: m_day_start.toDate() },
      })
      .exec((err, result) => {
        if (err) {
          rejects(err);
          return;
        }
        resolve(result);
      });
  });
}

async function get_ta_appointments(m_day_start, m_day_end, ta_id) {
  return new Promise((resolve, rejects) => {
    Appointment.aggregate()
      .match({
        _taId: ta_id,
        start_time: { $lte: m_day_end.toDate() },
        end_time: { $gt: m_day_start.toDate() },
      })
      .exec((err, result) => {
        if (err) {
          rejects(err);
          return;
        }
        resolve(result);
      });
  });
}

async function can_mastery(mastery_id, user_id) {
  return new Promise((resolve, rejects) => {
    let now = moment();

    Appointment.find({
      _masteryId: mastery_id,
      _studentId: user_id,
      start_time: { $gt: now },
    }).then((ap) => {
      if (ap.length > 0) {
        resolve(false);
        return;
      } else {
        MasteryCheck.findById(mastery_id)
          .populate({ path: "classroom", select: ["is_ordered_mastery"] })
          .then((ordered) => {
            if (ordered != null) {
              if (ordered.available == false) {
                resolve(false);
                return;
              }
              if (ordered.classroom.is_ordered_mastery == false) {
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
                      resolve(true);
                      return;
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
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).end();
    });
});

router.patch("/", ensureProfOrTAUser, async (req, res) => {
  if (!req.body.start_date || !req.body.end_date || !req.body.appointment_id) {
    return;
  }
  let b = moment(req.body.end_date);
  let a = moment(req.body.start_date);
  let start_day = moment(req.body.start_date).startOf("day");
  let end_day = moment(req.body.end_date).endOf("day");

  // console.log(a,b);
  if (a.isValid && b.isValid && b.isAfter(a) && a.isAfter(moment())) {
    appointment = await Appointment.findOne({ _id: req.body.appointment_id });
    if (!appointment && b.diff(a) != appointment.duration) {
      res.status(400).send("Invalid date");
      return;
    }
    // console.log("here")

    let ta_busy = await get_day_busy(start_day, appointment._taId);
    let stud_appointments = await get_student_appointments(
      start_day,
      end_day,
      appointment._studentId
    );
    let ta_appointments = await get_ta_appointments(start_day, end_day, appointment._taId);

    let total = [];

    if (ta_busy[0]) {
      ta_busy[0].busy.forEach((el) => {
        total.push(el);
      });
    }

    stud_appointments.forEach((el) => {
      if (el._id.toString() != appointment._id.toString()) {
        total.push([el.start_time, el.end_time]);
      }
    });

    ta_appointments.forEach((el) => {
      if (el._id.toString() != appointment._id.toString()) {
        total.push([el.start_time, el.end_time]);
      }
    });

    let availability = get_available_time2(a, b, total, appointment.duration);
    // console.log(availability)
    if (
      availability.length == 1 &&
      availability[0].start.isSame(a) &&
      availability[0].end.isSame(b)
    ) {
      Appointment.findOneAndUpdate(
        { _id: appointment._id },
        { $set: { start_time: a, end_time: b } },
        { new: true, upsert: false }
      )
        .then((updated_el) => {
          res.json(updated_el);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("Unknown error");
        });
      return;
    }
    res.status(400).send("This student has another appointment at this time");
    // console.log(availability)
  } else {
    res.status(400).send("Invalid date");
  }
});

router.get("/matching", ensureProfOrTA, (req, res) => {
  Classroom.findById(req.query.classroom_id).then((classroom) => {
    let masteries = classroom.mastery_checks;

    let filter = {};
    if (req.body.ta) {
      filter = {
        _studentId: req.query.student_id,
        _taId: req.query.ta_id,
        _masteryId: { $in: masteries }, // take appointements only for this class
        end_time: { $lte: moment() },
        isGraded: false,
        question: false,
      };
    } else {
      filter = {
        _studentId: req.query.student_id,
        end_time: { $lte: moment() },
        _masteryId: { $in: masteries }, // take appointements only for this class
        isGraded: false,
        question: false,
      };
    }
    Appointment.find(filter)
      .populate({
        path: "_studentId",
        select: ["name", "surname"],
      })
      .populate({
        path: "_masteryId",
        populate: {
          path: "topics",
        },
      })
      .then((appointments) => {
        res.json(appointments);
      });
  });
});
