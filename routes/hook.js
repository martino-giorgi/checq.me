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

router.post('/', ensureAuthenticated, (req, res) => {
  let commit = req.body.commits[0];
  let repo = req.body.repository;

  console.log(req.user)

  if (commit.message == 'final commit') {
    let Model = {
      commit_id: commit.url,
      repo: repo.url
    }

    console.log(Model);
  }

  res.status(200).end()
});
