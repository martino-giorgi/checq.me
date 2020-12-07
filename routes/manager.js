const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureProfOrTA } = require("../config/auth");
const Classroom = require("../models/Classroom");


module.exports = router;

router.get("/", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  Classroom.find({ lecturer: req.user._id })
    .populate({
      path: "teaching_assistants",
      select: ["name", "surname"],
    })
    .then((classrooms) => {
      res.render("manager/manager", { user: req.user, classrooms: classrooms });
    });
});

router.get("/classroom", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  let data = {
    user: req.user,
    classroom: req.query.classroom_id,
  };
  res.render("manager/classrooms/classroom", data);
});