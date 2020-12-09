const express = require("express");
const moment = require("moment");
require("twix");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessorUser,
  ensureStudent,
  ensureProfOrTAUser,
} = require("../config/auth");

const User = require("../models/User");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");

module.exports = router;

//get availability for the current user
router.get("/", ensureAuthenticated, ensureProfOrTAUser, (req, res) => {
  Availability.findOne({ _userId: req.user._id })
    .select({ busy: 1, _id: 1, _userId: 1 })
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

router.post("/", ensureAuthenticated, ensureProfOrTAUser, async (req, res) => {
  //input check
  let ok = true;
  let new_range;
  let start = moment(req.body.busy[0], "YYYY-MM-DDTHH:mm:ssZ");
  let end = moment(req.body.busy[1], "YYYY-MM-DDTHH:mm:ssZ");

  let now = moment();
  if (!(start.isValid && end.isValid) || end.diff(now) <= 0 || start.diff(now) <= 0) {
    res.status(400).send("Dates are invalid or are in the past");
    return;
  }

  let appointments = await Appointment.find({
    _taId: req.user._id,
    $or: [
      { start_time: { $lte: end.toDate() } },
      { $and: [{ start_time: { $gte: start.toDate() } }, { end_time: { $lte: end.toDate() } }] },
      { end_time: { $gte: end.toDate() } },
    ],
  });

  if (appointments.length > 0) {
    res.status(400).send("Make sure that the dates do not overlap existing events in the calendar");
    return;
  }
  new_range = start.twix(end);

  Availability.findOne({ _userId: req.user._id }).then((avail) => {
    if (avail) {
      for (let i = 0; i < avail.busy.length; i++) {
        let s = moment(avail.busy[i][0]).twix(moment(avail.busy[i][1]));
        if (
          new_range.overlaps(s) ||
          new_range.engulfs(s) ||
          new_range.equals(s) ||
          new_range.contains(s)
        ) {
          res
            .status(400)
            .send("Make sure that the dates do not overlap existing events in the calendar");
          return;
        }
      }
      let test = [[start, end]];
      avail.updateOne({ $addToSet: { busy: { $each: test } } }).then((response) => {
        res.status(200).end();
      });
    } else {
      console.log(
        "Professor/TA: " +
          req.user._id +
          " should have an availability document linked to his account!"
      );
      res.status(400).end();
      return;
    }
  });
});

router.patch('/',ensureAuthenticated, ensureProfOrTAUser, async (req, res) => {
  if(!req.body.old){
    res.status(400).end();
    return;
  }

})
