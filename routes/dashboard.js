const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');
const moment = require('moment');

const Classroom = require('../models/Classroom');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

module.exports = router;

// Dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  Appointment.find({
    $and: [
      { $or: [{ _taId: req.user._id }, { _studentId: req.user._id }] },
      { start_time: { $gte: moment() } },
    ],
  })
    .populate(['_masteryId', '_taId', '_studentId'])
    .then((result) => {
      Classroom.find({ _id: { $in: req.user.classrooms } }).then((classrooms) => {
        if (req.user.githubToken != '' && req.user.gravatar == '') {
          axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
              Authorization: 'token ' + req.user.githubToken,
            },
          }).then((response) => {
            User.findById(req.user.id, (err, user) => {
              if (err) throw err;

              user.gravatar = response.data.avatar_url;

              user.save((err) => {
                if (err) {
                  res.status(500).end();
                } else {
                  let Model = {
                    user: req.user,
                    classrooms: classrooms,
                  };

                  res.render('dashboard', { model: Model, appointments: result });
                }
              });
            });
          });
        } else {
          let Model = {
            user: req.user,
            classrooms: classrooms,
          };

          res.render('dashboard', { model: Model, appointments: result });
        }
      });
    });
});
