const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Classroom = require("../models/Classroom");

module.exports = router;

/**
 * Route serving the dashboard.
 * @name get/dashboard
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', ensureAuthenticated, (req, res) => {
  Classroom.find({ _id: { $in: req.user.classrooms }})
    .then((classrooms) => {
      let Model = {
        user: req.user,
        classrooms: classrooms
      }

      res.render('dashboard', { model: Model })
    })
});
