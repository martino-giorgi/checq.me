const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const routers = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Route for index page
app.use("/", routers.home);

// Route for user page
app.use("/user", routers.user);

// Route for dashboard page
app.use("/dashboard", routers.dashboard);

// Route for 404 error
app.get("*", function (req, res) {
  res.status(404).render("page404");
});

app.set("port", PORT);

const server = app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + server.address().port);
});
