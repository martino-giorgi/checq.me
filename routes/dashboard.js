const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

module.exports = router;

// Dashboard
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user });
});
