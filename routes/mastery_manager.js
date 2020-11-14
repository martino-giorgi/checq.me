const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const MasteryCheck = require("../models/MasteryCheck");

module.exports = router;

// Mastery Manager
router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role < 2) {
    MasteryCheck.find({}).then((result) =>
      res.render("mastery_manager", { collection: result })
    );
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});

router.post("/", ensureAuthenticated, (req, res) => {
  let mc = {
    name: req.body.input_name,
    description: req.body.input_description,
    available: req.body.check_available == "on" ? true : false,
    mandatory: req.body.check_mandatory == "on" ? true : false,
  };
  MasteryCheck.create(mc).then(() => {
    res.redirect("/manager");
  });
});
