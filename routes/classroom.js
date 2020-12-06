const express = require("express");
const crypto = require("crypto");
const moment = require("moment");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureProfOrTA,
  ensureMemberOfClass
} = require("../config/auth");

const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const TokenClassroom = require("../models/TokenClassroom");

module.exports = router;

// if PROFESSOR/TA = Get all the classrooms where the current user is the professor
// if STUDENT = returns all classes in which the student is enrolled

router.get("/", ensureAuthenticated, (req, res) => {

  // User is a Professor
  if (req.user.role == 0) {
    Classroom.find({ $or: [{ professors: { $in: [req.user] } }, { teaching_assistants: { $in: [req.user] } }] })
      .then((result) => {
        res.json({ classrooms: result, user: req.user });
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });

  }

  // User is a TA
  else if (req.user.role == 1) {
    let classrooms = req.user.ta_for_list;
    let promises = [];

    // get all classrooms in which the user is a ta ( as promises )
    for (let i = 0; i < classrooms.length; ++i) {
      promises.push(Classroom.findById(classrooms[i]));
    }
    let results = [];
    // wait for all classrooms to be found 
    Promise.all(promises).then(result => {
      result.forEach(prom_res => {
        results.push(prom_res);
      })
      res.json({ classrooms: results, user: req.user })
    }).catch(err => { console.log(err) });
  }

  // User is a Student
  else if (req.user.role == 2) {
    User.findOne({ _id: req.user._id })
      .then((user) => {
        if (user) {
          Classroom.find({ _id: { $in: user.classrooms } })
            .then((classrooms) => {
              res.json(classrooms);
            })
            .catch((err) => {
              console.log(err);
              res.json({});
            });
        } else {
          res.json({});
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });
  }
});

/*
PROFESSOR ROUTES
*/

//Post a new classroom
router.post("/new", ensureAuthenticated, ensureProfessor, (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const new_class = new Classroom({
    name: req.body.name,
    description: req.body.description,
    lecturer: req.user._id,
    professors: [req.user._id],
    teaching_assistants: [],
    topics: [],
    color: randomColor(),
    is_ordered_mastery: req.body.is_ordered,
    university_domain: "@" + req.user.email.split("@")[1],
    start_date: req.body.start_date,
    end_date: req.body.end_date
  });

  new_class.save().then((new_element) => {
    res.json(new_element);
  });
  User.findById(req.user._id).then((professor) => {
    professor.classrooms.addToSet(new_class._id);
    professor.save();
  });
});

router.get("/class", ensureAuthenticated, ensureMemberOfClass, (req, res) => {

  Classroom.find({ _id: req.query.classroom_id })
    .populate("teaching_assistants")
    .populate("professors")
    .populate({
      path: 'mastery_checks', // The string we passed in before
      populate: {
        path: 'topics' // This will populate the friends' addresses
      }
    })
    .populate({
      path: "lecturer",
      select: ["email", "name", "surname", "classrooms", "role"],
    })
    .populate({
      path: "partecipants",
      select: ["email", "name", "surname", "classrooms", "role"],
    })
    .then((result) => { 

      if (req.accepts('html')) {
        res.render('student_classroom', { model: { classroom: result, user: req.user } })
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({});
    });
});

// Add a TA

router.post("/ta", ensureAuthenticated, ensureProfessor, (req, res) => {
  let classroom = Classroom.findById(req.body.classroom_id);
  let new_ta = User.findById(req.body.user_id);

  let role;

  Promise.all([classroom, new_ta]).then(result => {
    let this_classroom = result[0];
    let this_user = result[1];

    role = this_user.role == 0 ? 0 : 1;

    if (this_classroom.lecturer._id.equals(this_user._id)) {
      res.status(400).end();
      return;
    }

    if (this_classroom.professors.includes(this_user._id)) {
      this_classroom.professors.remove({ _id: this_user._id })
    }
    // Add classroom id to the ta_for_list field of User
    this_user.role = role;
    this_user.ta_for_list.addToSet(this_classroom._id);
    // Add user id to teaching_assistant of Classroom and remove from participants
    this_classroom.partecipants.remove({ _id: this_user._id });
    this_classroom.teaching_assistants.addToSet(this_user._id);

    let p1 = this_user.save();
    let p2 = this_classroom.save();

    Promise.all([p1, p2]).then(() => {
      res.status(200).end();
    })

  })
    .catch(err => {
      console.log(err);
    })

})

// Remove a TA
router.delete("/ta", ensureAuthenticated, ensureProfessor, (req, res) => {
  console.log(req.body);
  let classroom = Classroom.findById(req.body.classroom_id);
  let old_ta = User.findById(req.body.user_id);

  Promise.all([classroom, old_ta]).then(result => {
    let this_classroom = result[0];
    let this_old_ta = result[1];

    // Remove classroom id from ta_for_list
    this_old_ta.ta_for_list.remove({ _id: this_classroom._id });
    // Check if has classrooms where user is TA and makes sure it's not a professor
    if (this_old_ta.ta_for_list.length == 0 && this_old_ta.role == 1) {
      this_old_ta.role = 2;
    }
    // Remove from teaching_assistant and add to participants
    this_classroom.teaching_assistants.remove({ _id: this_old_ta._id });
    this_classroom.partecipants.addToSet(this_old_ta._id);

    let p1 = this_classroom.save();
    let p2 = this_old_ta.save();

    Promise.all([p1, p2]).then(() => {
      res.status(200).end();
    })
  })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    })
});

// Add professor
router.post("/professor", ensureAuthenticated, ensureProfessor, (req, res) => {
  console.log(req.body);
  console.log(req.query.classroom_id);
  Classroom.findById(req.query.classroom_id).then(classroom => {

    User.findById(req.body.professor_id).then(usr => {
      if (usr.role != 0) {
        res.status(400).end();
        return;
      }
    })

    // If the User is a TA, remove him from class list and adjust their schema
    if (classroom.teaching_assistants.includes(req.body.professor_id)) {
      classroom.teaching_assistants.remove(req.body.professor_id);
      User.findById(req.body.professor_id).then(user => {
        user.ta_for_list.remove(req.query.classroom_id);
      });
    }

    classroom.professors.addToSet(req.body.professor_id);
    classroom.save().then(() => {
      classroom.partecipants.remove(req.body.professor_id)
      classroom.save().then(() => res.status(200).end())
    });
  }).catch((err) => { console.log(err); res.status(400).end() })
});

// Remove professor
router.delete("/professor", ensureAuthenticated, ensureProfessor, (req, res) => {
  if (!ObjectID.isValid(req.query.classroom_id)) {
    res.status(400).end();
    return;
  }



  Classroom.findById(req.query.classroom_id).then(classroom => {

    User.findById(req.body.professor_id).then(prof => {
      // should not be possible to remove prof role from owner
      if (prof._id.equals(classroom.lecturer)) {
        res.status(400).end();
        console.log("here");
        return;
      }
      classroom.professors.remove(req.body.professor_id);
      classroom.partecipants.addToSet(req.body.professor_id);
      classroom.save().then(() => {
        res.status(200).end();
      })
    });
  })
    .catch(err => console.log(err));
})

// Remove student from class
router.delete("/student", ensureAuthenticated, ensureProfessor, (req, res) => {
  Classroom.findById(req.query.classroom_id).then(classroom => {
    classroom.partecipants.remove(req.body.student_id);
    User.findById(req.body.student_id).then(student => {
      student.classrooms.remove(req.query.classroom_id);
      student.save();
    })
    classroom.save().then(() => {
      res.status(200).end();
    })
  })
})

//generates the new map for students and tas.


router.post("/testmapping", ensureAuthenticated, (req, res) => {
  mapTAs(req.body.classroom_id).then(updated_classroom => {
    console.log(updated_classroom);
    res.json(updated_classroom);
  })
})

//create a new invite link
router.get(
  "/invite",
  ensureAuthenticated,
  ensureProfOrTA,
  (req, res) => {
    TokenClassroom.findOne({ _classroomId: req.query.classroom_id }).then(
      (c_t) => {
        if (c_t) {
          res.json(`http://${req.headers.host}/classroom/join/${c_t.token}`);
        } else {
          Classroom.findById(req.query.classroom_id).then((c) => {
            if (c) { // ensure ProfOrTA ensures that the TA or Prof accessing is part of this class
              let token = new TokenClassroom({
                _classroomId: c._id,
                token: crypto.randomBytes(20).toString("hex"),
              });
              token
                .save()
                .then(() => {
                  res.json(
                    `http://${req.headers.host}/classroom/join/${token.token}`
                  );
                })
                .catch((err) => {
                  console.log(err);
                  res.status(400).send(err).end();
                });
            } else {
              res.status(400).send("secondo errore").end();
            }
          });
        }
      }
    );
  }
);

//(((move to a new route?)))
//add a mastery day for this classroom, id of the classromm is expected in the body
router.post("/mday", ensureAuthenticated, ensureProfessor, (req, res) => {
  let start = moment(req.body.start, "YYYY-MM-DDTHH:mm", true);
  let end = moment(req.body.end, "YYYY-MM-DDTHH:mm", true);
  if (
    !(start.isValid && end.isValid) ||
    // !(
    //   (end.isoWeekday() == req.body.iso_day_n) &&
    //   start.weekday() == req.body.iso_day_n
    // ) ||
    (end.diff(start) <= 0)
  ) {
    console.log("invalid date")
    res.status(400).end();
  }
  else {
    ClassroomMasteryDay.findOne({
      classroom: req.body._classroomId,
      iso_day_n: req.body.iso_day_n,
    }).then(r => {
      console.log(r);
      if (r) {
        res.status(400).end();
      } else {
        const new_mastery_day = new ClassroomMasteryDay({
          classroom: req.body._classroomId,
          iso_day_n: req.body.iso_day_n,
          start_time: start.valueOf(),
          end_time: end.valueOf(),
        });
        new_mastery_day
          .save()
          .then((new_element) => {
            Classroom.findByIdAndUpdate(
              req.body._classroomId,
              { $set: { mastery_days: new_element._id } },
              { new: true }
            )
              .select({ mastery_days: 1 })
              .then((ms) => {
                ClassroomMasteryDay.find()
                  .where("_id")
                  .in(ms.mastery_days)
                  .then((x) => {
                    res.json(x);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(400).end();
                  });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).end();
          });
      }
    });
  }
});



/*
STUDENT ROUTES
*/

//this link will be given to the new students, once clicked it will automatically join the classroom
//this route CANNOT be used as an API to interact with the database from ajax.
router.get("/join/:token", ensureAuthenticated, (req, res) => {
  // console.log("here")
  TokenClassroom.findOne({ token: req.params.token })
    .then((t) => {
      let p1 = Classroom.findById(t._classroomId);
      let p2 = User.findById(req.user._id);

      // Get classroom and user ( wait to have them both )
      Promise.all([p1, p2])
        .then((values) => {
          let classroom = values[0];
          let user = values[1];

          user.classrooms.addToSet(t._classroomId);
          classroom.partecipants.addToSet(req.user._id);

          let p3 = classroom.save();
          let p4 = user.save();

          // Wait for both user and classroom to be saved
          Promise.all([p3, p4])
            .then((results) => {
              if (results[0] && results[1]) {
                res.redirect("/dashboard");
              }
            })
            .catch((err) => {
              console.log(err);
              res.send("error joining class, retry").end();
            });
        })
        .catch((err) => {
          console.log(err);
          res.send("error joining class, retry").end();
        });
    })
    .catch((err) => {
      console.log(err);
      res.send("error joining class, retry").end();
    });
});

// Random color chooser
function randomColor() {
  let colors = [
    "e53935",
    "d81b60",
    "8e24aa",
    "5e35b1",
    "3949ab",
    "1e88e5",
    "039be5",
    "00acc1",
    "00897b",
    "43a047",
    "f4511e",
    "795548",
    "546e7a",
  ];

  color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}
