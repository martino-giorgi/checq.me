const express = require("express");
const crypto = require("crypto");
const moment = require("moment");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");
const path = require("path");

const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");
const TokenClassroom = require("../models/TokenClassroom");
const { resolve } = require("path");
const { rejects } = require("assert");

module.exports = router;

// if PROFESSOR/TA = Get all the classrooms where the current user is the professor
// if STUDENT = returns all classes in which the student is enrolled

router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role == 1 || req.user.role == 0) {
    Classroom.find({ lecturer: req.user }) 
      .populate("topics")
      .then((result) => {
        res.json({ classrooms: result, user: req.user });
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });
  } else if (req.user.role == 2) {
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
    teaching_assistants: [],
    topics: [],
    color: randomColor(),
    is_ordered_mastery: req.body.is_ordered == 'on' ? true : false,
    university_domain: "@" + req.user.email.split("@")[1],
    start_date: toMoment(req.body.start_date),
    end_date: toMoment(req.body.end_date)
  });

  new_class.save().then(() => {
    User.findById(req.user._id).then((professor) => {
      professor.classrooms.addToSet(new_class._id);
      professor.save();

      res.redirect("/manager");
    });
  });
});

router.get("/:id", ensureAuthenticated, ensureProfessor, (req, res) => {
  Classroom.find({ _id: req.params.id })
    .select({ name: 1, description: 1, classrooms: 1, color: 1})
    .populate("teaching_assistants")
    .populate("mastery_checks")
    .populate({
      path: "lecturer",
      select: ["email", "name", "surname", "classrooms", "role"],
    })
    .populate({
      path: "partecipants",
      select: ["email", "name", "surname", "classrooms", "role"],
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({});
    });
});

//generates the new map for students and tas.


router.post("/testmapping", ensureAuthenticated, (req, res) => {
  mapTAs(req.body.classroom_id).then(updated_classroom => {
    console.log(updated_classroom);
    res.json(updated_classroom);
  })
})

//create a new invite link
router.get(
  "/invite/:classroom_id",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
    TokenClassroom.findOne({ _classroomId: req.params.classroom_id }).then(
      (c_t) => {
        if (c_t) {
          res.json(`http://${req.headers.host}/classroom/join/${c_t.token}`);
        } else {
          Classroom.findById(req.params.classroom_id).then((c) => {
            if (c && c.lecturer.toString() == req.user._id.toString()) {
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
                  res.status(400).end();
                });
            } else {
              res.status(400).end();
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
    (end.diff(start)<=0)
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
              .select({ mastery_days: 1})
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
router.get("/join/:token", ensureAuthenticated, ensureStudent, (req, res) => {
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

// Convert date to iso
function toMoment(date) {
  let base_date = date.replace(/\//g, "-").split('-');
  let iso = base_date.reverse().join('-') + 'T00:00:00.000';
  
  return moment(iso);
}
