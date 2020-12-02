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
} = require("../config/auth");

const User = require("../models/User");
const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const Classroom = require("../models/Classroom");
const { resolve } = require("path");
const { rejects } = require("assert");

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
          ClassroomMasteryDay.find({ classroom: mastery.classroom._id })
            .then((mastery_days) => {
              let assigned_ta = mastery.classroom.ta_mapping.get(user_id.toString());
              let booked = false;
              let weeks = 0;
              
              while(!booked){
                for(let i = 0; i < mastery_days.length && !booked; i++){
                  m_day = mastery_days[i];
                  let m_day_start;
                  let m_day_end;
                  
                  if (moment().isoWeekday() <= m_day.iso_day_n) {
                    // then just give me this week's instance of that day
                    m_day_start = moment().add(weeks, "weeks").isoWeekday(m_day.iso_day_n);
                    m_day_end = moment().add(weeks, "weeks").isoWeekday(m_day.iso_day_n);
                  } else {
                    // otherwise, give me *next week's* instance of that same day
                    m_day_start = moment()
                      .add(1+weeks, "weeks")
                      .isoWeekday(m_day.iso_day_n);
                    m_day_end = moment()
                      .add(1+weeks, "weeks")
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
                  console.log("Start: " + moment(m_day_start).toDate() + ", End:" + moment(m_day_end).toDate());




                  console.log(m_day_start.startOf('day').toDate())


                  Availability.aggregate().unwind('$busy').match({_userId: assigned_ta,
                  $and: [ {"busy.0": {$lte: moment('2020-12-03').endOf('day').toDate()}}, 
                          {"busy.1": {$gte: moment('2020-12-03').startOf('day').toDate()}}
                        ]})
          .group({ _id: "$_userId", busy : {$addToSet: "$busy"}})
.exec((err , result)=> {
console.log(result);
})


                  Availability.findOne(filter)/*.select({busy: 1})*/.exec((err, avail)=>{
                    if(err){
                      console.log(err);
                      //non so che cazzo fare
                    }
                    else{
                      // console.log(avail);
                      let available_slots = get_avail_slots(m_day_start, m_day_end, m_day.iso_day_n, avail.busy);
                      console.log("Busy slots:",avail)
                      console.log("Available slots:",available_slots)
                      if(available_slots > 0){
                        //trybooking with assigned TA
                        trybooking(assigned_ta, mastery_id, m_day_start, m_day_end, mastery.duration, req.user._id, available_slots);
                      }
                      
                      get_TA_queue(m_day_start, mastery.classroom.teaching_assistants, [assigned_ta]).then(queue => {
                        for(let j = 0; j < queue.length; j++){
                          Availability.findOne({_userId: queue[j]._id}).exec((err, avail2)=>{
                            if(err){
                              //non so che cazzo fare pt.2
                            }

                            available_slots = get_avail_slots(m_day_start, m_day_end, m_day.iso_day_n, avail2);

                            if (available_slots > 0) {
                              //trybook with current TA
                            }
                          })
                        }
                      });
                    }
                  });
                  // booked = true;
                  // break;
                }
                weeks++;
              }
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



router.get("/canbook", (req, res) => {
  Availability.aggregate().unwind('$busy').match({_userId: mongoose.Types.ObjectId("5fb4351a1cf7e5fab846ca09"),
                                                  $and: [ {"busy.0": {$lte: moment('2020-12-03').endOf('day').toDate()}}, 
                                                          {"busy.1": {$gte: moment('2020-12-03').startOf('day').toDate()}}
                                                        ]})
                                          .group({ _id: "$_userId", busy : {$addToSet: "$busy"}})
.exec((err , result)=> {
    console.log(result);
  })
  res.end();
})

async function trybooking(ta, mastery_id, m_day_start, m_day_end, m_duration, student_id, available_slots) {
  return new Promise((resolve, rejects) => {
    console.log("GVNG");
    Appointment.find({_taId: ta, 
                      time: {$gte: m_day_start.toDate(), 
                              $lte: m_day_end.toDate()}})
                .exec((err, appointments) => {
                  if (err) {
                    console.log(err);
                    rejects(err);
                    return;
                  } else {
                    let test = appointments.map((el) => {return [el.start_time, el.end_time]})
                    let available = get_avail_slots(m_day_start, m_day_end, m_day_start.isoWeekday(), test)

                    console.log("booked", test, available)
                  }
                })
  })
}


router.get("/taqueue",(req, res) => {
  console.log("ciao")
  get_TA_queue(moment("2020-12-02"), [ mongoose.Types.ObjectId("5fbbbd26278c90520deec26c"), mongoose.Types.ObjectId("5fb435501cf7e5fab846ca0b"), mongoose.Types.ObjectId("5fb4351a1cf7e5fab846ca09")],[mongoose.Types.ObjectId("5fb4351a1cf7e5fab846ca09")]);
  res.end();
})


function get_TA_queue(date, classroom_tas, exclude) {
  return new Promise((resolve, rejects) => {
    const date_start = moment(date).startOf('day');

    Appointment.aggregate().match({ $and: [{_taId:{$in: classroom_tas}}, {_taId:{$not:{$in: exclude}}}],
                                    time: {$gte: date_start.toDate(), 
                                    $lte: moment(date_start).endOf('day').toDate()}})
                            .group({_id: "$_taId", count: {$sum: 1}})
                            .sort("count")
                            // .project({count:0})
                            .exec((err, result)=>{console.log(result);resolve(result);rejects(err)});
  });
}


function get_avail_slots(m_day_start, m_day_end, m_iso_day, ranges) {
  let available_slots = [];
  
  for (let i = 0; i < ranges.length; i++) {
    // console.log("AVAILABILITY: "+avail);
    // console.log("BUSY: "+avail.busy);
      let start = moment(ranges[i][0]);
      let end = moment(ranges[i][1]);
      
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
        } else if(start.isBefore(m_day_start) && end.isAfter(m_day_end)) {
          // no possible slots
          available_slots.splice(0, available_slots.length);
          break;
        }
      } else if (start.isoWeekday() != m_iso_day && end.isoWeekday() == m_iso_day) {
        if (end.isBefore(m_day_start)) {
          // possible slot from m_day_begin to m_day_end
          available_slots.push([m_day_start, m_day_end]);
        } else if (end.isAfter(m_day_start) && end.isBefore(m_day_end)) {
          // possible slot from end
          available_slots.push([end, m_day_end]);
        } else if (end.isAfter(m_day_end)) {
          // no possible slots
          available_slots.splice(0, available_slots.length);
          break;
        }
      } else if (start.isoWeekday() == m_iso_day && end.isoWeekday() != m_iso_day) {
        if (start.isAfter(m_day_start) && start.isBefore(m_day_end)) {
          // possible slot form m_day_start to start
          available_slots.push([mm_day_start, start]);
        } else if (start.isAfter(m_day_end)) {
          // possible slot from m_day_start to m_day_end
          available_slots.push([m_day_start, m_day_end]);
        } else if (start.isBefore(m_day_start)) {
          // no possible slots
          available_slots.splice(0, available_slots.length);
          break;
        }
      } else if (start.isoWeekday() != m_iso_day && end.isoWeekday() != m_iso_day) {
        // all possible slot
        available_slots.push([m_day_start, m_day_end]);
      }
    }
    // available_slots.forEach(el => {console.log(el[0],el[1])});
    return available_slots;
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
      duration: req.body.duration
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
