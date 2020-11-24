const express = require("express");
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
const axios = require('axios');

require('dotenv').config();

module.exports = router;

let token = null;

router.get('/', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
});

router.get('/oauth-callback', (req, res) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code
  };

  const opts = { headers: { accept: 'application/json' } };

  axios.post(`https://github.com/login/oauth/access_token`, body, opts)
    .then((result) => {
      token = result.data['access_token'];
      res.redirect('/dashboard')
    })
    .catch(err => res.status(500).json({ message: err.message }));
});
