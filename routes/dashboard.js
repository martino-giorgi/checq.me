const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Classroom = require("../models/Classroom");

module.exports = router;

// Dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  let promises = [];

  // Create a promise and store it for all classrooms
  for (let i = 0; i < req.user.classrooms.length; i++) {
    let id = req.user.classrooms[i];
    promises.push(loadClassroom(id));
  }

  // When all promises are resolved, then render the view
  Promise
    .all(promises)
    .then((classrooms) => {
      let Model = {
        user: req.user,
        classrooms: classrooms
      }

      res.render('dashboard', { model: Model });
    })
    .catch((err) => {
      if (err) throw err;
    })
});


// Promise for getting the classrooms classes
function loadClassroom(value) {
  return new Promise((resolve) => {
    resolve(Classroom.findOne({ _id: value }))
  });
}
