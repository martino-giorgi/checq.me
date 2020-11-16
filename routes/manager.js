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
  res.render("manager/manager", { user: req.user });
});

// Mastery Manager renderer
router.get("/mastery", ensureAuthenticated, ensureProfessor, (req, res) => {
  MasteryCheck.find({}).then((result) => {
    res.render("manager/mastery", { result });
  });
});

// Mastery Check add
// router.post("/mastery", ensureAuthenticated, (req, res) => {
//   if (!req.body.name || !req.body.description) {
//     res.status(400);
//   }
//   const mc = new MasteryCheck({
//     name: req.body.name,
//     description: req.body.description,
//     available: req.body.available == "on" ? true : false,
//   });
//   mc.save().then(() => res.status(200).end());
// });

// Mastery Check delete
// router.delete("/mastery", ensureAuthenticated, (req, res) => {
//   if (req.user.role < 2) {
//     MasteryCheck.deleteOne({ _id: req.body.id })
//       .then(() => {
//         res.status(200).end();
//       })
//       .catch((err) => console.log(err));
//   } else {
//     res.status(403).send("You don't have permission to view this page");
//   }
// });

/*
  Get all the classrooms where the current user is the lecturer
*/
// router.get("/classroom", ensureAuthenticated, (req, res) => {
//   if (req.user.role < 1) {
//     Classroom.find({ lecturer: req.user })
//       .populate("topics")
//       .then((result) => {
//         res.render("manager/classrooms", { collection: result });
//       });
//   } else {
//     res.status(403).send("You don't have permission to view this page");
//   }
// });

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
