const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureHasNoGithubToken
} = require("../config/auth");

const User = require("../models/User");
const axios = require('axios');

require('dotenv').config();

module.exports = router;


// TODO: Remember to change User Authorization Callback URL to "http://www.checq.me/github/oauth-callback"
// in production

router.get('/', ensureAuthenticated, ensureHasNoGithubToken, (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
});


router.get('/oauth-callback', ensureAuthenticated, ensureHasNoGithubToken, (req, res) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code
  };

  const opts = { headers: { accept: 'application/json' } };

  axios.post(`https://github.com/login/oauth/access_token`, body, opts)
    .then((result) => {
      token = result.data['access_token'];

      axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          Authorization: 'token ' + token
        }
      })
      .then((response) => {
          User.findById(req.user.id, (err, user) => {
            if (err) throw err;

            User.findOne({ githubId: response.data.id }).then((user_f) => {
              if (user_f) {
                res.redirect('/profile');
              } else {
                user.githubToken = token;
                user.githubId = response.data.id;

                user.save((err) => {
                  if (err) {
                    res.status(500).end();
                  } else {
                    res.redirect('/profile');
                  }
                });
              }
            });
          });
        });
      })
      .catch(err => res.status(500).json({ message: err.message }));
});
