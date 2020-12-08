const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureProfOrTA, ensureProfessorUser, ensureProfOrTAUser } = require("../config/auth");
const Classroom = require("../models/Classroom");
const User = require("../models/User");


module.exports = router;

router.get("/", ensureAuthenticated, ensureProfOrTAUser, (req, res) => {
  Classroom.find({ $or: [{ professors: { $in: [req.user] } }, { teaching_assistants: { $in: [req.user] } }] })
    .populate({
      path: "teaching_assistants",
      select: ["name", "surname"],
    })
    .then((classrooms) => {
      // console.log(classrooms);
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