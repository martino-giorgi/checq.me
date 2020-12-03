const express = require("express");
const crypto = require("crypto");
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
const TokenClassroom = require("../models/TokenClassroom");
const { response } = require("express");
const Question = require("../models/Question");

module.exports = router;

/**
 * Route serving the view to add new questions to a topic.
 * @name get/question/new
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/new",
  ensureAuthenticated,
  ensureProfessor || ensureTa,
  (req, res) => {
    res.render("manager/classrooms/new_question", { user: req.user })
  })

/**
 * Route serving the posting of new questions.
 * @name post/question/new
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/new", ensureAuthenticated, ensureProfessor || ensureTa,
  (req, res) => {
    //console.log(req.body);
    const new_q = new Question({
      text: req.body.text,
      answer: req.body.answer,
      lang: req.body.lang
    })
    let p1 = Topic.findById(req.body.topic);
    let p2 = new_q.save();

    Promise.all([p1, p2]).then(results => {
      let topic = results[0];
      let question = results[1]

      topic.questions.addToSet(question._id);

      topic.save().then(() => {
        res.json(topic.questions);
      })

    })
      .catch((err) => {
        console.log(err);
      })

  })

/**
 * Route serving the posting of answers to questions to be checked.
 * @name post/question/check
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/check", ensureAuthenticated, (req, res) => {

  Question.findById(req.body.question).then(q => {
    let given_answers = req.body.answers;
    let flag = false;
    for (let i = 0; i < given_answers.length; ++i) {

      if (!q.answer[given_answers[i]][1]) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }
    // if all given answers are wrong, check that also the expected ones are
    if (given_answers.length == 0) {

      let all_wrong = true;
      for (let j = 0; j < q.answer.length; ++j) {
        if (q.answer[j][1]) {
          all_wrong = false;
        }
      }
      if (all_wrong) {
        flag = true;
      }
    }
    res.json({ result: flag });
  })
    .catch(err => {
      console.log(err);
    })
})

