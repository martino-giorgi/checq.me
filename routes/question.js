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

router.get("/new", 
            ensureAuthenticated, 
            ensureProfessor || ensureTa,
            (req, res) => {
    res.render("manager/classrooms/new_question", {user: req.user})
})

router.post("/new", ensureAuthenticated, ensureProfessor || ensureTa,
            (req, res) => {
              //console.log(req.body);
              const new_q = new Question ({
                text: req.body.text,
                answer: req.body.answer,
                lang: req.body.lang
              })
              let p1 = Topic.findById(req.body.topic);
              let p2 = new_q.save();

              Promise.all([p1, p2]).then( results => {
                let topic = results[0];
                let question = results[1]
                
                topic.questions.addToSet(question._id);

                topic.save().then( () => {
                  res.json(question);
                })
                
              })
              .catch((err)=> {
                console.log(err);
              })

})

