const express = require("express");
const crypto = require("crypto");
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
const TokenClassroom = require("../models/TokenClassroom");
const { response } = require("express");

module.exports = router;

router.get("/new", 
            ensureAuthenticated, 
            ensureProfessor || ensureTa,
            (req, res) => {
    res.render("manager/classrooms/new_question", {user: req.user})
})

