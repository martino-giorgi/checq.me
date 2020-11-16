const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");

const User = require("../models/User");
const Classroom = require("../models/Classroom");

module.exports = router;

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("scheduler/scheduler", { user: req.user });
});