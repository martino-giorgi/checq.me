const express = require('express');
const request = require('request');
const router = express.Router();

const User = require('../models/User');
const MasteryCheck = require('../models/MasteryCheck');
const axios = require('axios');

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
            let repo_url = repo.url.split('-');
            repo_url.splice(-1);
            repo_url = repo_url.join('-');

            MasteryCheck.findOne({ repo: repo_url }).then((mastery) => {
              if (mastery) {
                let body_data = JSON.stringify({
                  mastery_id: mastery._id,
                  user_id: user._id,
                });

                // TODO: Change in production to http://checq.me/appointment/book
                request.post(
                  { url: 'http://localhost:3000/appointment/book', body: body_data },
                  function (err, httpResponse, body) {
                    console.log('ok')
                    console.log(err, body);
                  }
                );
              }
            });
          }
        });
    }
  }

  res.status(200).end();
});
