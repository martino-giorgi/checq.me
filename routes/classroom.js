const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");
const path = require("path");

const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");
const TokenClassroom = require("../models/TokenClassroom");

module.exports = router;

// if PROFESSOR/TA = Get all the classrooms where the current user is the professor
// if STUDENT = returns all classes in which the student is enrolled
router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role == 1 || req.user.role == 0) {
    Classroom.find({ lecturer: req.user })
      .populate("topics")
      .then((result) => {
        res.json(result);
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
    lecturer: req.user,
    teaching_assistants: [],
    topics: [],
    is_ordered_mastery: false,
  });

  new_class.save().then(() => {
    res.redirect("/classroom");
  });
});

//create a new invite link
//TODO if token for class already exists return the existing one.
router.get(
  "/invite/:classroom_id",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
    Classroom.findById(req.params.classroom_id).then((c) => {
      // console.log(c.lecturer.toString() == req.user._id.toString());
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
);

/*
STUDENT ROUTES
*/

//this link will be given to the new students, once clicked it will automatically join the classroom
//this route CANNOT be used as an API to interact with the database from ajax.
router.get("/join/:token", ensureAuthenticated, ensureStudent, (req, res) => {
  // console.log("here")
  TokenClassroom.findOne({ token: req.params.token })
    .then((t) => {
      User.findById(req.user._id)
        .then((u) => {
          u.classrooms.addToSet(t._classroomId);
          u.save()
            .then((new_u) => {
              if (new_u) {
                res.redirect("/dashboard");
              } else {
                console.log("error modifying user: " + u._id);
                res.status(400).send("error joining class, retry").end();
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
