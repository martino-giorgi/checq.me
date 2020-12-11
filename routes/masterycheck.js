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

/**
 * Route to post a new masterycheck
 * @name post/masterycheck?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
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

/**
 * Route to delete a masterycheck
 * @name delete/masterycheck?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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
          Question.deleteOne({_id: q._id}).then( () => {
            console.log("deleted q")
          }).catch( err => {console.log(err)})
        });
        topics.forEach(t => {
          Topic.deleteOne({_id: t._id}).then( () => {
            console.log("deleted t");
          }).catch(err => {console.log(err)})
        });
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


/**
 * Route to modify a masterycheck
 * @name put/masterycheck?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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

/**
 * Route get the list of masterychecks for a classroom
 * @name get/masterycheck?classroom_id=
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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
