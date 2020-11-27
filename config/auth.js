module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view the dashboard");
    res.redirect("/user/login");
  },

  ensureProfessor: (req, res, next) => {
    if(req.user.role == 0){
      return next();
    }
    res.status(403).send("You don't have permission to view this page");
  },

  ensureStudent: (req, res, next) => {
    if(req.user.role == 2){
      return next();
    }
    res.status(403).send("You don't have permission to view this page");
  },

  ensureTa: (req, res, next) => {
    if(req.user.role == 1){
      return next();
    }
    res.status(403).send("You don't have permission to view this page");
  },

  ensureHasNoGithubToken: (req, res, next) => {
    if(req.user.githubToken == '') {
      return next();
    }
    res.redirect("/profile");
  }
};
