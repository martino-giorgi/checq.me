const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureProfessor } = require("../config/auth");

const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");

module.exports = router;

// Profile route
router.get("/:id", ensureAuthenticated, (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    res.render("profile/profile", { user });
  });
});
