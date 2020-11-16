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

router.post(
    "/",
    ensureAuthenticated,
    ensureProfessor,
    (req, res) => {
      // find the classroom
      Classroom.findOne({ _id: req.body.classroom }).then((this_class) => {
        if (!this_class) {
          res.status(400).end();
        } else {
          const new_topic = new Topic({
            name: req.body.name,
            description: req.body.description,
            questions: [],
          });
          // save new topic and add it to the list of the class
          new_topic.save().then(() => {
            this_class.topics.push(new_topic);
            this_class.save((error) => {
              if (error) {
                res.status(500).end();
              } else {
                res.redirect("/manager/classroom");
              }
            });
          });
        }
      });
    }
  );