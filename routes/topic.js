const express = require("express");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;

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

module.exports = router;

router.get("/:id", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  Topic.findOne({ _id: req.params.id }).then((this_topic) => {
    if (!this_topic) {
      res.status(400).end();
    }
    else {
      res.json(this_topic);
    }
  })
})

router.put('/', ensureAuthenticated, ensureProfOrTA, (req, res) => {
  Topic.updateOne({ _id: req.query.topic_id }, { $set: { name: req.body.name, description: req.body.description } })
    .then(() => res.status(200).end())
    .catch((err) => { console.log(err), res.status(400).end() })
})

router.post("/", ensureAuthenticated, ensureProfOrTA, (req, res) => {
  MasteryCheck.findById(req.query.mastery_id).then(this_mastery => {
    if (!this_mastery) {
      res.status(400).end();
    }
    else {
      const new_topic = new Topic({
        name: req.body.name,
        description: req.body.description,
        mastery_id: req.query.mastery_id
      });
      new_topic.save().then(() => {
        this_mastery.topics.push(new_topic);
        this_mastery.save().then(() => {
          // res.redirect(`/manager/classroom?classroom_id=${req.body.classroom}`);
          res.status(200).end();
          return;
        })
      })
        .catch((err) => {
          console.log(err);
        })
    }
  })

});


// Get all the questions for the specified topic
// If the request comes from a student, the answers are filtered out so that they are not sent.
router.get("/:id/questions", ensureAuthenticated, (req, res) => {

  if (!ObjectID.isValid(req.params.id)) {
    res.json({}).end();
    return;
  }

  Topic.findById(req.params.id).populate("questions").then(result => {
    // if professor or TA
    if (req.user.role < 2) {
      res.json(result.questions);
    }
    // if student
    else {

      let filtered = [];
      // for each element, filterout the answer
      result.questions.forEach(elem => {

        elem.answer.forEach(answ => {
          answ[1] = null;
        });

        filtered.push(elem);
      })

      res.json(filtered);

    }
  })
    .catch(err => {
      console.log(err)
    })


})

router.get("/questions/answer", ensureAuthenticated, (req, res) => {
  if(req.query.topic) {
    if(req.query.classroom_id) {
      let p1 = Topic.findById(req.query.topic);
      let p2 = Classroom.findById(req.query.classroom_id);

      Promise.all([p1,p2]).then( results => {
        let this_topic = results[0];
        let this_class = results[1];
        res.render("questions/questions", { user: req.user, classroom: this_class, topic: this_topic });
      })
    }else {
      res.render("page404");
    }
  }else {
    res.render("page404");
  }
})
