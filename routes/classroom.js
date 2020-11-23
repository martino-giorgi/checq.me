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

module.exports = router;


// COMMON ROUTES

/**
 * If PROFESSOR/TA -> Get all the classrooms where the current user is the professor/ta,
 * if STUDENT -> returns all classes in which the student is enrolled.
 * @name get/classroom
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role == 1 || req.user.role == 0) {
    Classroom.find({ lecturer: req.user })
      .populate("topics")
      .then((result) => {
        res.json({ classrooms: result, user: req.user });
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });
  } else if (req.user.role == 2) {
    User.findOne({ _id: req.user._id })
      .then((user) => {
        if (user) {
          Classroom.find({ _id: { $in: user.classrooms } })
            .then((classrooms) => {
              res.json(classrooms);
            })
            .catch((err) => {
              console.log(err);
              res.json({});
            });
        } else {
          res.json({});
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });
  }
});


// PROFESSOR ROUTES

/**
 * Route creating a new classroom.
 * @name post/classroom/new
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/new", ensureAuthenticated, ensureProfessor, (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.description) {
    res.status(400);
  }
  const new_class = new Classroom({
    name: req.body.name,
    description: req.body.description,
    lecturer: req.user._id,
    teaching_assistants: [],
    topics: [],
    color: randomColor(),
    is_ordered_mastery: req.body.is_ordered,
    university_domain: '@' + req.user.email.split('@')[1]
  });

  new_class.save().then((new_element) => {
    // res.redirect("/classroom");
    res.json(new_element)
  });
  User.findById(req.user._id).then(professor => {
    professor.classrooms.addToSet(new_class._id);
    professor.save();
  })
});

/**
 * Route serving a classroom given its id.
 * @name get/classroom/:id
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/:id", ensureAuthenticated, ensureProfessor, (req, res) => {
  Classroom.find({ _id: req.params.id })
    .populate("teaching_assistants")
    .populate("mastery_checks")
    .populate("lecturer")
    .populate("partecipants")
    .then((result) => {
      // 
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({});
    });
})

/**
 * Route serving the classroom's token given its id.
 * @name get/classroom/invite/:classroom_id
 * @todo If token for class already exists return the existing one.
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get( "/invite/:classroom_id", ensureAuthenticated, ensureProfessor, (req, res) => {
  TokenClassroom.findOne({_classroomId: req.params.classroom_id}).then(c_t => {
    if(c_t){
      res.json(`http://${req.headers.host}/classroom/join/${c_t.token}`)
    } else {
      Classroom.findById(req.params.classroom_id).then((c) => {
        // console.log(c.lecturer.toString() == req.user._id.toString());
        if (c && c.lecturer.toString() == req.user._id.toString()) {
          let token = new TokenClassroom({
            _classroomId: c._id,
            token: crypto.randomBytes(20).toString("hex"),
          });
          token
            .save()
            .then(() => {
              res.json(
                `http://${req.headers.host}/classroom/join/${token.token}`
              );
            })
            .catch((err) => {
              console.log(err);
              res.status(400).end();
            });
        } else {
          res.status(400).end();
        }
      });
    }
  })
});


// STUDENT ROUTES

/**
 * Check if the invite link is valid, in which case the class that the link is referred to will
 * be added to the student's classrooms list. This route CANNOT be used as an API to interact
 * with the database from ajax.
 * @name get/classroom/join/:token
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/join/:token", ensureAuthenticated, ensureStudent, (req, res) => {
  // console.log("here")
  TokenClassroom.findOne({ token: req.params.token })
    .then((t) => {
      let p1 = Classroom.findById(t._classroomId);
      let p2 = User.findById(req.user._id);

      // Get classroom and user ( wait to have them both )
      Promise.all([p1, p2]).then( values => {
        let classroom = values[0];
        let user = values[1];

        user.classrooms.addToSet(t._classroomId);
        classroom.partecipants.addToSet(req.user._id);

        let p3 = classroom.save();
        let p4 = user.save();

        // Wait for both user and classroom to be saved
        Promise.all([p3,p4]).then( results => {
          if(results[0] && results[1]) {
            res.redirect("/dashboard");
          }
        })
        .catch( (err) => {
          console.log(err);
          res.send("error joining class, retry").end();
        })
      }) 
      .catch( (err) => {
        console.log(err);
        res.send("error joining class, retry").end();
      })
    })
    .catch((err) => {
      console.log(err);
      res.send("error joining class, retry").end();
    });
});


/**
 * Random color generator for the newly created classroom
 * @returns {string} - random color hex string
 */
function randomColor() {
  let colors = ['e53935', 'd81b60', '8e24aa', '5e35b1', '3949ab',
                '1e88e5', '039be5', '00acc1', '00897b', '43a047',
                'f4511e', '795548', '546e7a'];

  color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}
