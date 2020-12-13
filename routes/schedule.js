const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureProfessor, ensureStudent, ensureTa } = require('../config/auth');

const User = require('../models/User');
const Classroom = require('../models/Classroom');
const MasteryCheck = require('../models/MasteryCheck');

module.exports = router;

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('schedule', { user: req.user });
});
