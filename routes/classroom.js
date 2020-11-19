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

// if PROFESSOR/TA = Get all the classrooms where the current user is the professor
// if STUDENT = returns all classes in which the student is enrolled
router.get("/", ensureAuthenticated, (req, res) => {
  if (req.user.role == 1 || req.user.role == 0) {
    Classroom.find({ lecturer: req.user })
      .populate("topics")
      .then((result) => {
        res.json({classrooms: result, user: req.user});
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

/*
PROFESSOR ROUTES
*/

//Post a new classroom
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
});

router.get("/:id", ensureAuthenticated, ensureProfessor, (req, res) => {
  Classroom.find({ _id: req.params.id })
      .populate("teaching_assistants")
      .populate("mastery_checks")
      .populate("lecturer")
      .then((result) => {
        // 
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });
        
})

//create a new invite link
//TODO if token for class already exists return the existing one.
router.get(
  "/invite/:classroom_id",
  ensureAuthenticated,
  ensureProfessor,
  (req, res) => {
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
  }
);

/*
STUDENT ROUTES
*/

//this link will be given to the new students, once clicked it will automatically join the classroom
//this route CANNOT be used as an API to interact with the database from ajax.
router.get("/join/:token", ensureAuthenticated, ensureStudent, (req, res) => {
  // console.log("here")
  TokenClassroom.findOne({ token: req.params.token })
    .then((t) => {

      let p1 = Classroom.findById(t._classroomId);
      let p2 = User.findById(req.user._id);

      Promise.all([p1, p2]).then( values => {
        let classroom = values[0];
        let user = values[1];

        user.classrooms.addToSet(t._classroomId);
        classroom.partecipants.addToSet(req.user._id);

        let p3 = classroom.save();
        let p4 = user.save();
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


      // User.findById(req.user._id)
      //   .then((u) => {
      //     u.classrooms.addToSet(t._classroomId);
      //     u.save()
      //       .then((new_u) => {
      //         if (new_u) {
      //           res.redirect("/dashboard");
      //         } else {
      //           console.log("error modifying user: " + u._id);
      //           res.status(400).send("error joining class, retry").end();
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         res.send("error joining class, retry").end();
      //       });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.send("error joining class, retry").end();
      //   });
    })
    .catch((err) => {
      console.log(err);
      res.send("error joining class, retry").end();
    });
});


// Random color chooser
function randomColor() {
  let colors = ['e53935', 'd81b60', '8e24aa', '5e35b1', '3949ab',
                '1e88e5', '039be5', '00acc1', '00897b', '43a047',
                'f4511e', '795548', '546e7a'];

  color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}
