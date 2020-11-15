const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const path = require("path");

const MasteryCheck = require("../models/MasteryCheck");

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
    MasteryCheck.find({}).then((result) => {
      res.render("manager/mastery", { result });
    });
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});

// Mastery Check add
router.post("/mastery", ensureAuthenticated, (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const mc = new MasteryCheck({
    name: req.body.name,
    description: req.body.description,
    available: req.body.available == "on" ? true : false,
  });
  mc.save().then(() => res.status(200).end());
});

// Mastery Check delete
router.delete("/mastery", ensureAuthenticated, (req, res) => {
  if (req.user.role < 2) {
    MasteryCheck.deleteOne({ _id: req.body.id })
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => console.log(err));
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});
