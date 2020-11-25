const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureProfessor } = require("../config/auth");

const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");

module.exports = router;

// Profile route
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("profile/profile", { user: {
    name: req.user.name,
    surname: req.user.surname,
    email: req.user.email,
    role: req.user.role,
    id: req.user._id,
    githubToken: req.user.githubToken,
    githubId: req.user.githubId,
    gravatar: req.user.gravatar
  }});
});
