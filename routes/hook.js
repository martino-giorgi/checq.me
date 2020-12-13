const express = require('express');
const request = require('request');
const router = express.Router();

const User = require('../models/User');
const MasteryCheck = require('../models/MasteryCheck');
const axios = require('axios');

const appointment = require('../routes/appointment');

require('dotenv').config();

module.exports = router;

router.post('/', (req, res) => {
  let user = req.body.sender;
  let repo = req.body.repository;
  let commit;

  if (typeof req.body.commits !== undefined) {
    commit = req.body.commits[0];

    if (commit.message == 'final commit') {
      User.findOne({ githubId: user.id })
        .select({ password: 0 })
        .then((user) => {
          if (user) {
            let repo_url = repo.full_name.split('-');
            repo_url.splice(-1);
            repo_url = repo_url.join('-');

            MasteryCheck.findOne({ repo: repo_url }).then((mastery) => {
              if (mastery) {
                console.log('Appointment request initiated from /hook');
                appointment.book(user._id, mastery._id);
              }
            });
          }
        });
    }
  }

  res.status(200).end();
});
