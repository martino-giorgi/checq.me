const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

const Classroom = require('../models/Classroom');
const User = require('../models/User');

module.exports = router;

// Dashboard
router.get('/', ensureAuthenticated, (req, res) => {
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

              res.render('dashboard', { model: Model });
            }
          });
        });
      });
    } else {
      let Model = {
        user: req.user,
        classrooms: classrooms,
      };

      res.render('dashboard', { model: Model });
    }
  });
});
