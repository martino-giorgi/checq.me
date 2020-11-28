const express = require("express");
const moment = require("moment");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");

const User = require("../models/User");
const Availability = require("../models/Availability");

module.exports = router;

//get availability for the current user
router.get("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  Availability.findOne({ _userId: req.user._id }).select({busy: 1, _id: 1, _userId: 1})
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

//update availability, duplicates, past dates, invalid dates are all ignored 
router.post("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  //input check
  let ok = true;
  req.body.busy.forEach((slot) => {
    let start = moment(slot[0], "YYYY-MM-DDTHH:mm", true);
    let end = moment(slot[1], "YYYY-MM-DDTHH:mm", true);
    let now = moment();
    if (
      !(start.isValid && end.isValid) ||
      end.diff(now) <= 0 ||
      start.diff(now) <= 0
    ) {
      ok = false;
    }
  });
  if (ok) {
    Availability.findOneAndUpdate(
      { _userId: req.user._id},
      { $addToSet: { busy: {$each: req.body.busy }} },
      { upsert:true, new: true },
    )
      .then((r) => {
        User.findOneAndUpdate({_id: req.user._id}, { $set: { availability: r._id } })
          .then((u) => {
            res.json(r);
          })
          .catch((err) => {
            console.log(err);
            res.status(400);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
      });
  } else {
    res.status(400);
  }
});
