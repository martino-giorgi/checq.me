const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");

module.exports = router;

// Mastery Manager
router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role < 2) {
    res.render("manager/manager");
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});

// Mastery Manager
router.get("/mastery", ensureAuthenticated, (req, res) => {
  if (req.user.role < 2) {
    MasteryCheck.find({}).then((result) =>
      res.render("manager/mastery", { collection: result })
    );
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});

router.post("/mastery", ensureAuthenticated, (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const mc = new MasteryCheck({
    name: req.body.name,
    description: req.body.description,
    available: req.body.available == "on" ? true : false,
    mandatory: req.body.mandatory == "on" ? true : false,
  });
  mc.save().then(() => {
    res.redirect("/manager");
  });
});

router.delete("/mastery", ensureAuthenticated, (req, res) => {
  MasteryCheck.deleteOne({ _id: req.body._id }).then(() => {
    res.status(200).end();
  });
});

router.get('/classroom', ensureAuthenticated, (req, res) => {
  if (req.user.role < 1) {
    Classroom.find({}).then( result => {
      res.render('manager/classrooms', {collection: result})
    })
  } 
  else {
    res.status(403).send("You don't have permission to view this page");
  } 
});
 