const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Check if there is an account for that email
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "This email is not registered" });
        }

        // Check if passwords match
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
