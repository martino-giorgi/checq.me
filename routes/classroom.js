const express = require("express");
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

module.exports = router;

/*
PROFESSOR ROUTES
*/

//Get all the classrooms where the current user is the professor
router.get("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  Classroom.find({ lecturer: req.user })
    .populate("topics")
    .then((result) => {
      res.render("manager/classrooms", { collection: result });
    });
});

//Post a new classroom
router.post("/new", ensureAuthenticated, ensureProfessor, (req, res) => {
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
    res.redirect("/manager/classroom");
  });
});

// Post a new topic and link it to the classroom
router.post(
  "/classroom/add_topic",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
    // find the classroom
    Classroom.findOne({ _id: req.body.classroom }).then((this_class) => {
      if (!this_class) {
        res.status(400).end();
      } else {
        const new_topic = new Topic({
          name: req.body.name,
          description: req.body.description,
          questions: [],
        });
        // save new topic and add it to the list of the class
        new_topic.save().then(() => {
          this_class.topics.push(new_topic);
          this_class.save((error) => {
            if (error) {
              res.status(500).end();
            } else {
              res.redirect("/manager/classroom");
            }
          });
        });
      }
    });
  }
);

/*
STUDENT ROUTES
*/

//returns all classes in which the student is enrolled
router.get("/", ensureAuthenticated, ensureStudent, (req, res) => {
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
});
