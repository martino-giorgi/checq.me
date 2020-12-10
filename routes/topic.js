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

/**
 * Route to get a specific topic
 * @name get/topic/:id?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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

/**
 * Route to update a topic
 * @name put/topic
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/', ensureAuthenticated, ensureProfOrTA, (req, res) => {
  Topic.updateOne({ _id: req.query.topic_id }, { $set: { name: req.body.name, description: req.body.description } })
    .then(() => res.status(200).end())
    .catch((err) => { console.log(err), res.status(400).end() })
})

/**
 * Route to post a new topic
 * @name post/topic?classroom_id=&mastery_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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



/**
 * Route to get all questions linked to a specific topic. If the user requesting is a student, the answers are not sent to the client.
 * @name get/topic/:id/questions
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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

/**
 * Route used to render the page showing all questions linked to a specific topic.
 * @name get/topic/questions/answer?topic
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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
