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




// if PROFESSOR/TA = Get all the classrooms where the current user is the professor
// if STUDENT = returns all classes in which the student is enrolled
router.get("/", ensureAuthenticated, (req, res) => {
  if(req.user.role == 1 || req.user.role == 0){
      Classroom.find({ lecturer: req.user })
    .populate("topics")
    .then((result) => {
      res.json(result);
    }).catch(err => {
      console.log(err);
      res.json({})
    })
  } else if (req.user.role == 2){
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
})


/*
PROFESSOR ROUTES
*/

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
    res.redirect("/classroom");
  });
});

/*
STUDENT ROUTES
*/
