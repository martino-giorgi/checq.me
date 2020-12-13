const express = require("express");
const moment = require("moment");
require("twix");
const mongoose = require("mongoose");
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
  let new_range;
  let start = moment(req.body.busy[0], "YYYY-MM-DDTHH:mm:ssZ");
  let end = moment(req.body.busy[1], "YYYY-MM-DDTHH:mm:ssZ");

  let now = moment();
  if (!(start.isValid && end.isValid) || end.diff(now) <= 0 || start.diff(now) <= 0) {
    res.status(400).send("Dates are invalid or are in the past");
    return;
  }

  let appointments = await Appointment.find({
    $and: [
      { _taId: req.user._id },
      {
        $or: [
          {
            $and: [
              { start_time: { $lte: end.toDate() } },
              { start_time: { $gte: start.toDate() } },
            ],
          },
          {
            $and: [{ start_time: { $gte: start.toDate() } }, { end_time: { $lte: end.toDate() } }],
          },
          {
            $and: [{ end_time: { $gte: start.toDate() } }, { end_time: { $lte: end.toDate() } }],
          },
        ],
      },
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

router.patch("/", ensureAuthenticated, ensureProfOrTAUser, async (req, res) => {
  if (
    !req.body.old ||
    !req.body.new ||
    !moment(req.body.old[0]).isValid() ||
    !moment(req.body.old[1]).isValid()
  ) {
    res.status(400).end();
    return;
  }

  let r = await validateInput(req.body.new, req.user._id, req.body.old);

  if (r != true) {
    res.status(400).send(r);
    return;
  }
  let old_start = moment(req.body.old[0]);
  let old_end = moment(req.body.old[1]);

  Availability.findOneAndUpdate(
    { _userId: req.user._id, busy: [old_start, old_end] },
    { $set: { "busy.$": [moment(req.body.new[0]).toDate(), moment(req.body.new[1]).toDate()] } },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Unknown error");
    });
});

async function validateInput(busy, user_id, busy_old) {
  let errors = [
    "Make sure that the dates do not overlap existing events in the calendar",
    "Dates are invalid or are in the past",
    "Unknown error",
  ];

  let new_range;
  let start = moment(busy[0], "YYYY-MM-DDTHH:mm:ssZ");
  let end = moment(busy[1], "YYYY-MM-DDTHH:mm:ssZ");

  let now = moment();
  if (!(start.isValid && end.isValid) || end.diff(now) <= 0 || start.diff(now) <= 0) {
    return errors[1];
  }

  let appointments = await Appointment.find({
    $and: [
      { _taId: user_id },
      {
        $or: [
          {
            $and: [
              { start_time: { $lte: end.toDate() } },
              { start_time: { $gte: start.toDate() } },
            ],
          },
          {
            $and: [{ start_time: { $gte: start.toDate() } }, { end_time: { $lte: end.toDate() } }],
          },
          {
            $and: [{ end_time: { $gte: start.toDate() } }, { end_time: { $lte: end.toDate() } }],
          },
        ],
      },
    ],
  });

  if (appointments.length > 0) {
    return errors[0];
  }

  new_range = start.twix(end);

  let avail = await Availability.findOne({ _userId: user_id });

  if (!avail) {
    return errors[2];
  }

  for (let i = 0; i < avail.busy.length; i++) {
    if (
      busy_old &&
      moment(avail.busy[i][0]).isSame(busy_old[0]) &&
      moment(avail.busy[i][1]).isSame(busy_old[1])
    ) {
      continue;
    }
    let s = moment(avail.busy[i][0]).twix(moment(avail.busy[i][1]));
    if (
      new_range.overlaps(s) ||
      new_range.engulfs(s) ||
      new_range.equals(s) ||
      new_range.contains(s)
    ) {
      return errors[0];
    }
  }
  return true;
}

//This route will return a success even if the element sent to the server to be deleted doesn't exist
router.delete("/", ensureAuthenticated, ensureProfOrTAUser, (req, res) => {
  Availability.findOneAndUpdate({ _userId: req.user._id }, { $pull: { busy: req.body.old_busy } })
    .then((result) => {
      res.status(200).send("Delete successful!");
    })
    .catch((err) => {
      res.status(400).send("Error");
    });
});
