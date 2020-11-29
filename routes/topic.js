const express = require("express");
const router = express.Router();
var ObjectID = require("mongodb").ObjectID;

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

router.get("/:id", ensureAuthenticated, ensureProfessor, (req, res) => {
  Topic.findOne({_id: req.params.id}).then( (this_topic) => {
    if(!this_topic) {
      res.status(400).end();
    }
    else {
      res.json(this_topic);
    }
  })
})

router.post("/", ensureAuthenticated, ensureProfessor, (req, res) => {
  console.log(req.body);
  MasteryCheck.findById(req.body.mastery).then( this_mastery => {
    if(!this_mastery) {
      res.status(400).end();
    }
    else {
      const new_topic = new Topic({
        name: req.body.name,
        description: req.body.description,
        questions: [],
        mastery_id: req.body.mastery
      });
      new_topic.save().then( () => {
        this_mastery.topics.push(new_topic);
        this_mastery.save().then( () => { 
            res.redirect(`/manager/classroom?id=${req.body.classroom}`);
        })
      })
      .catch( (err)=> {
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

        elem.answer.forEach( answ => {
          answ[1] = null;
        });
        
        filtered.push(elem);
      })
      
      res.json(filtered);
      
    }
  })
  .catch(err=>{
    console.log(err)
  })

  
})

router.get("/questions/answer", ensureAuthenticated, (req, res) => {
  res.render("questions/questions", {user: req.user});
})
