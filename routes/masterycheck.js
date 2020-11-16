const express = require("express");
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

module.exports = router;

/*
PROFESSOR ROUTES
*/
router.post("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const mc = new MasteryCheck({
    name: req.body.name,
    description: req.body.description,
    available: req.body.available == "on" ? true : false,
    class: 
  });
  mc.save()
    .then(() => res.status(200).end())
    .catch((err) => {
      console.log(err);
      res.status(400).end();
    });
});

router.delete("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  MasteryCheck.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => console.log(err));
});

/*
STUDENT ROUTES
*/
