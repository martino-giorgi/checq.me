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

router.get('/manage', ensureAuthenticated, ensureProfessor, (req, res) => {
  res.render("manager/manage_classes")
})

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
    color: randomColor()
  });

  new_class.save().then(() => {
    res.redirect("/classroom");
  });
});

/*
STUDENT ROUTES
*/


// Random color chooser
function randomColor() {
  let colors = ['e53935', 'd81b60', '8e24aa', '5e35b1', '3949ab',
                '1e88e5', '039be5', '00acc1', '00897b', '43a047',
                'f4511e', '795548', '757575', '546e7a'];

  color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}
