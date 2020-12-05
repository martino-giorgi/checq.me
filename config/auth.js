const Classroom = require("../models/Classroom");
const ObjectID = require("mongodb").ObjectID;

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view the dashboard");
    res.redirect("/user/login");
  },

  ensureProfessor: (req, res, next) => {
    if (req.user.role == 0) {
      if (req.query.classroom_id) {

        if (!ObjectID.isValid(req.query.classroom_id)) {
          res.status(400).send("Classroom id is not in valid format");
          return;
        }

        Classroom.findById(req.query.classroom_id).then(this_class => {
          if (this_class && (this_class.professors.includes(req.user._id))) {
            return next();
          } else {
            res.status(403).render('page403');
          }
        });
      } else {
        return next();
      }
    } else {
      res.status(403).render('page403');
    }
  },

  ensureStudent: (req, res, next) => {
    if (req.user.role == 2) {
      return next();
    }
    res.status(403).render('page403');
  },

  ensureProfOrTA: (req, res, next) => {
    if (req.user.role == 1 || req.user.role == 0) {
      if (req.query.classroom_id) {

        if (!ObjectID.isValid(req.query.classroom_id)) {
          res.status(400).send("Classroom id is not in valid format");
          return;
        }

        Classroom.findById(req.query.classroom_id).then(this_class => {
          if (this_class && (this_class.teaching_assistants.includes(req.user._id) || this_class.professors.includes(req.user._id))) {
            return next();
          } else {
            res.status(403).render('page403');
          }
        });
      } else {
        return next();
      }

    } else {
      res.status(403).render('page403');
    }
  },

  ensureHasNoGithubToken: (req, res, next) => {
    if (req.user.githubToken == '') {
      return next();
    }
    res.redirect("/profile");
  }
};
