const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { ensureAuthenticated,
        ensureProfOrTA,
        ensureProfOrTAUser
      } = require("../config/auth");
=======
const { ensureAuthenticated, ensureProfOrTA, ensureProfessorUser, ensureProfOrTAUser } = require("../config/auth");
>>>>>>> main
const Classroom = require("../models/Classroom");
const User = require("../models/User");


module.exports = router;

router.get("/", ensureAuthenticated, ensureProfOrTAUser, (req, res) => {
<<<<<<< HEAD
  if (req.user.role == 0) {
    Classroom.find({ lecturer: req.user._id })
      .populate({
        path: "teaching_assistants",
        select: ["name", "surname"],
      })
      .then((classrooms) => {
        res.render("manager/manager", { user: req.user, classrooms: classrooms });
      });
  } else if (req.user.role == 1) {

  }
=======
  Classroom.find({ $or: [{ professors: { $in: [req.user] } }, { teaching_assistants: { $in: [req.user] } }] })
    .populate({
      path: "teaching_assistants",
      select: ["name", "surname"],
    })
    .then((classrooms) => {
      // console.log(classrooms);
      res.render("manager/manager", { user: req.user, classrooms: classrooms });
    });
>>>>>>> main
});

router.get("/classroom", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  let data = {
    user: req.user,
    classroom: req.query.classroom_id,
  };
  res.render("manager/classrooms/classroom", data);
});