const express = require("express");
const router = express.Router();
const { ensureAuthenticated,
        ensureProfOrTA,
        ensureProfOrTAUser
      } = require("../config/auth");
const Classroom = require("../models/Classroom");


module.exports = router;

router.get("/", ensureAuthenticated, ensureProfOrTAUser, (req, res) => {
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
});

router.get("/classroom", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  let data = {
    user: req.user,
    classroom: req.query.classroom_id,
  };
  res.render("manager/classrooms/classroom", data);
});