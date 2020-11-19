const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureProfessor } = require("../config/auth");
const path = require("path");

const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");

module.exports = router;

// Mastery Manager
router.get("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  Classroom.find({ lecturer: req.user._id }).then((classrooms) => {
    res.render("manager/manager", { user: req.user, classrooms: classrooms });
  });
});

router.get("/classroom", ensureAuthenticated, ensureProfessor, (req, res) => {
  let data = {
    user: req.user,
    classroom: req.query.id,
  };
  res.render("manager/classrooms/classroom", data);
});

router.get(
  "/classroom/students",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
    res.render("manager/classrooms/students", {
      user: req.user,
      classroom: req.query.id,
    });
  }
);

//old routes:

// Mastery Manager renderer
router.get("/mastery", ensureAuthenticated, ensureProfessor, (req, res) => {
  res.render("manager/mastery/mastery", { user: req.user });
});

// Classroom Manager renderer
router.get("/classrooms", ensureAuthenticated, ensureProfessor, (req, res) => {
  res.render("manager/classrooms/classrooms");
});

/*
  Render the form to add a new classroom
*/
router.get(
  "/classroom/new",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
    res.render("manager/new_classroom");
  }
);

/*
  Get the form to add a new topic to the selected class
*/
router.get(
  "/classroom/add_topic/:classroom/:name",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
    let model = {
      name: req.params.name,
      classroom: req.params.classroom,
    };
    res.render("manager/new_topic", model);
  }
);

router.get("/classroom/topic/:id", ensureAuthenticated, (req, res) => {
  if (req.user.role < 1) {
    Topic.findOne({ _id: req.params.id }).then((this_topic) => {
      res.render("manager/topic", this_topic);
    });
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});
