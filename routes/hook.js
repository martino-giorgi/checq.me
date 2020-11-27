const express = require("express");
const router = express.Router();

const User = require("../models/User");
const axios = require('axios');

require('dotenv').config();

module.exports = router;

router.post('/', (req, res) => {
  let user = req.body.sender
  let repo = req.body.repository;
  let commit;

  if (typeof req.body.commits !== undefined) {
    commit = req.body.commits[0];

    if (commit.message == 'final commit') {
      let Model = {
        user_id: user.id,
        commit_id: commit.url,
        repo: repo.url
      }
  
      console.log("\nreceived model:\n", Model);
    }
  }
  
  res.status(200).end()
});
