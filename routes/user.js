const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

module.exports = router;

router.get("/signup", (req, res) => {
  res.render("signup", {});
});

router.get("/login", (req, res) => {
  res.render("login", {});
});

router.post("/signup", (req, res) => {
  const { name, surname, email, password, conf_password } = req.body;
  let errors = [];

  if (!name || !surname || !email || !password || !conf_password) {
    errors.push({ msg: "Please insert all fields" });
  }

  if (password != conf_password) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length <= 6) {
    errors.push({ msg: "Password too short" });
  }

  if (errors.length > 0) {
    res.render("signup", { errors, name, surname, email });
  } else {
    // Check if a user with the given email already exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "A user with this email already exists" });
        res.render("signup", { errors, name, surname, email });
      } else {
        const new_user = new User({
          name,
          surname,
          email,
          password,
        });

        // Generate an hash from the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(new_user.password, salt, (err, hash) => {
            if (err) throw err;
            else {
              new_user.password = hash;
              new_user
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered. Please confirm your email and log in"
                  );
                  // Account created with success. Redirect to login page
                  res.redirect("/user/login");
                })
                .catch((error) => console.log(error));
            }
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    //TODO redirects and flash
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_logout_msg", "Logged out correctly");
  //TODO redirects and flash handling
  res.redirect("/");
});

module.exports = router;
