const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");

module.exports = router;

// Mastery Manager
router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role < 2) {
    res.render("manager/manager");
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});

// Mastery Manager
router.get("/mastery", ensureAuthenticated, (req, res) => {
  if (req.user.role < 2) {
    MasteryCheck.find({}).then((result) =>
      res.render("manager/mastery", { collection: result })
    );
  } else {
    res.status(403).send("You don't have permission to view this page");
  }
});

router.post("/mastery", ensureAuthenticated, (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const mc = new MasteryCheck({
    name: req.body.name,
    description: req.body.description,
    available: req.body.available == "on" ? true : false,
    mandatory: req.body.mandatory == "on" ? true : false,
  });
  mc.save().then(() => {
    res.redirect("/manager");
  });
});

router.delete("/mastery", ensureAuthenticated, (req, res) => {
  MasteryCheck.deleteOne({ _id: req.body._id }).then(() => {
    res.status(200).end();
  });
});

/*
  Get all the classrooms where the current user is the lecturer
*/
router.get('/classroom', ensureAuthenticated, (req, res) => {
  if (req.user.role < 1) {
    Classroom.find({lecturer: req.user}).populate('topics').then( result => {
      res.render('manager/classrooms', {collection: result})
    })
  } 
  else {
    res.status(403).send("You don't have permission to view this page");
  } 
});
 
/*
  Render the form to add a new classroom
*/
router.get('/classroom/new', ensureAuthenticated, (req, res)=> {
  if (req.user.role < 1) {
    
      res.render('manager/new_classroom', {});

  } 
  else {
    res.status(403).send("You don't have permission to view this page");
  } 
})

/*
  Post a new classroom
*/
router.post('/classroom/new', ensureAuthenticated, (req, res)=> {
  if (!req.body.name || !req.body.description) {
    res.status(400); 
  }
  const new_class = new Classroom({
    name: req.body.name,
    description: req.body.description,
    lecturer: req.user,
    teaching_assistants: [],
    topics: [],
    is_ordered_mastery: false
  })

  new_class.save().then(() => {
    res.redirect("/manager/classroom");
  });
});

/*
  Get the form to add a new topic to the selected class
*/
router.get('/classroom/add_topic/:classroom/:name', ensureAuthenticated, (req, res) => {
  if (req.user.role < 1) {
    let model = {
      name: req.params.name,
      classroom: req.params.classroom
    }
    res.render('manager/new_topic', model);

  } 
  else {
    res.status(403).send("You don't have permission to view this page");
  } 
})

router.post('/classroom/add_topic', ensureAuthenticated, (req, res) => {
  if (req.user.role < 1) {
    Classroom.findOne({_id: req.body.classroom}).then( this_class => {
      
      if (!this_class) {
        res.status(400).end();
      } else {
        const new_topic = new Topic({
          name: req.body.name,
          description: req.body.description,
          questions: []
        });
        new_topic.save().then( () => {
          this_class.topics.push(new_topic);
          this_class.save((error) => {
            if (error) {
              res.status(500).end();
            } else {
              res.redirect('manager/classroom');
            }
          })
        })
        
      }
    });    
  }
  else {
    res.status(403).send("You don't have permission to view this page");
  }
})

