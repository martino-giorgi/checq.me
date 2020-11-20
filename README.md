<p align="center">
  <img height="100" src="https://github.com/martino-giorgi/checq.me/blob/main/public/assets/branding/logo/logo_blue.svg">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hosted_on_Heroku-informational?style=flat&logo=heroku&logoColor=white&color=430098">
  <img src="https://img.shields.io/badge/Designed_on_Figma-informational?style=flat&logo=figma&logoColor=white&color=F24E1E">
  <img src="https://img.shields.io/badge/Node.JS-v12.18.3-informational?style=flat&color=007ec6">
</p>

checq.me is a web application that allows students, professors, and TAs to easily manage mastery checks and preparation for them.

The idea of this project is to create a web app that manages mastery checks and everything closely related to them. It will contain everything that a professor and its TAs need to manage mastery checks with ease and everything that a student may need to prepare and schedule them. The app will be developed with ease of use in mind, to make the process of managing and scheduling mastery checks much more fluid and easy

## Protected routes

When navigating the protected routes (dashboard, classroom, ...) the user must be logged in.
To make sure they are you need to import and use `ensureAuthenticated`.

### Example 

```
const { ensureAuthenticated } = require("../config/auth");

// Dashboard
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user });
});
```

In this way only users that are logged in can get this page. If they are not they will be redirected to the login page with an error message.
