const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

require("dotenv").config();

const User = require("../models/User");
const Token = require("../models/Token");

const { resolve } = require("path");
const { rejects } = require("assert");


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
            if (err) {
              console.log(err);
            } else {
              new_user.password = hash;
              new_user
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered. Please confirm your email and log in"
                  );
                  //create an email verification token for the new user
                  let token = new Token({
                    _userId: user._id,
                    token: crypto.randomBytes(20).toString("hex"),
                  });
                  token
                    .save()
                    .then(() => {
                      send_verification_mail(req.headers.host, token, user.email).then((sent_email)=>{
                        res.redirect("/user/login");
                      }).catch((err)=>{
                        console.log(err);
                        res.status(500);
                      });
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
            }
          });
        });
      }
    });
  }
});

router.get("/verify/:token", (req, res) => {
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token || err) {
      res.status(400).end(); //unable to verify due to server error or invalid/expired token
    } else {
      User.findOne({ _id: token._userId }, (err, user) => {
        if (err) throw err;
        if (!user) {
          res.status(400).end(); //unable to find a user for this token
        } else if (user.isConfirmed) {
          res.status(400).end(); //user is already verified (clicked twice on the confirmation link)
        } else {
          user.isConfirmed = true;
          user.save((err) => {
            if (err) {
              res.status(500).end(); //could not set the user to verified so the verification failed
            } else {
              res.redirect("/user/login"); //account verified successufully
            }
          });
        }
      });
    }
  });
});

router.post("/verify/resend", (req, res) => {
  console.log(req.body);
  if (req.body.email) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          Token.deleteMany({ _userId: user._id })
            .catch((err) => {});
            let token = new Token({
              _userId: user._id,
              token: crypto.randomBytes(20).toString("hex"),
            });
            token.save().then(() => {
              console.log("resending");
              send_verification_mail(req.headers.host, token, user.email).then((res)=>{
                // console.log(res);
                // console.log("end");
                //email sent correctly! (the user needs to be aware that the operation was successful)
              })
            }).catch((err)=>{});
        } else {
          res.status(400).end(); //the email does not correspond to a user
        }
      })
      .catch((err) => {});
  } else {
    res.status(400).end(); //no email was given
  }
});



function send_verification_mail(host, token, target_email){
  return new Promise( (resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "Sendgrid",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let verification_link = `http://${host}/user/verify/${token.token}`;
    var mailOptions = {
      from: "marco.diventura@outlook.com",
      to: target_email,
      subject: `Checq.me account verification`,
      text: verification_link,
      html: `<a href='${verification_link}'>Verify your account by clicking here!</a>`,
    };
    resolve(transporter.sendMail(mailOptions));
  })
}

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/user/login");
});

module.exports = router;
