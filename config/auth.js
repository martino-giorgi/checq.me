const Classroom = require("../models/Classroom");

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
      return next();
    }
    res.status(403).send("You don't have permission to view this page");
  },

  ensureStudent: (req, res, next) => {
    if (req.user.role == 2) {
      return next();
    }
    res.status(403).send("You don't have permission to view this page");
  },

  ensureProfOrTA: (req, res, next) => {
    if (req.user.role == 1 || req.user.role == 0) {
      if (req.query.classroom_id) {
        Classroom.findById(req.query.classroom_id).then(this_class => {
          if (this_class && (this_class.teaching_assistants.includes(req.user._id) || this_class.professors.includes(req.user._id))) {
            return next();
          } else {
            res.status(403).send("You don't have permission to view this page");
          }
        });
      } else {
        return next();
      }

    } else {
      res.status(403).send("You don't have permission to view this page");
    }
  },

  ensureHasNoGithubToken: (req, res, next) => {
    if (req.user.githubToken == '') {
      return next();
    }
    res.redirect("/profile");
  }
};
