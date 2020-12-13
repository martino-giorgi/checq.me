const express = require('express');
const router = express.Router();

module.exports = router;

// Homepage
router.get('/', (req, res) => {
  res.render('home');
});
