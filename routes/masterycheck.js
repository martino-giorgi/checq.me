const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureProfOrTA
} = require("../config/auth");
const path = require("path");

const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

module.exports = router;

/*
PROFESSOR ROUTES
*/
router.post("/", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const mc = new MasteryCheck({
    name: req.body.name,
    description: req.body.description,
    available: req.body.available,
    classroom: req.query.classroom_id,
    author: req.user._id,
  });
  mc.save().then(mastery => {
    Classroom.findById(req.query.classroom_id).then(classroom => {
      classroom.mastery_checks.addToSet(mastery._id);
      classroom.save().then(() => res.status(200).end());
    })
      .catch((err) => {
        console.log(err);
        res.status(400).end();
      })
  })
    .catch((err) => {
      console.log(err);
      res.status(400).end();
    })
});

router.delete("/", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  // remove mastery from the classroom
  Classroom.findById(req.query.classroom_id).then(classroom => {
    classroom.mastery_checks.remove(req.query.mastery_id);
    classroom.save();
  })
  // Deep delete, delete all topics and questions linked to this masterycheck
  let topic_promises = [];
  let question_promises = [];
  MasteryCheck.findById(req.query.mastery_id).then(mastery=> {
    mastery.topics.forEach(topic_id => {
      topic_promises.push(Topic.findById(topic_id));
    })
    Promise.all(topic_promises).then( topics => {
      topics.forEach(topic => {
        topic.questions.forEach(question => {
          question_promises.push(Question.findById(question._id));
        })
      })
      Promise.all(question_promises).then( questions => {
        console.log(questions);
        console.log(topics);
        questions.forEach(q => {
          Question.deleteOne({_id: q._id});
        });
        topics.forEach(t => {
          Topic.deleteOne({_id: t._id});
        })
        MasteryCheck.deleteOne({ _id: req.query.mastery_id })
          .then(() => {
            res.status(200).end();
          })
          .catch((err) => console.log(err));
      })
    })
  })
  // remove masterycheck from the db
  
});

// EDIT mastery check
router.put('/', ensureAuthenticated, ensureProfOrTA, (req, res) => {
  console.log(req.body);
  MasteryCheck.updateOne({ _id: req.query.mastery_id }, { $set: { name: req.body.name, description: req.body.description, available: req.body.available } })
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
    })
})

// GET mastery check list of the classroom
router.get("/", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  MasteryCheck.find({ classroom: req.query.classroom_id })
    .populate("topics")
    .then((result) => {
      if (result) {
        res.json(result)
      } else {
        res.status(400).end();
      }
    })
});
