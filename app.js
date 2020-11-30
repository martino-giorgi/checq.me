const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
// const session = require("express-session");
const session = require("cookie-session");
const expressLayouts = require("express-ejs-layouts");
const sass = require("sass");
const fs = require("fs");

const routers = require("./routes");
const router = require("./routes/profile");

const app = express();
const SmeeClient = require('smee-client')

// Uncomment when SSL certificate is available
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));

// Scss renderer
sass.render(
  {
    file: path.join(__dirname, "public/stylesheets/scss/style.scss"),
    outputStyle: "compressed",
  },
  (error, result) => {
    if (error) throw error;

    const localPath = path.join(__dirname, "public/stylesheets/css/style.css");
    fs.writeFileSync(localPath, result.css);
  }
);

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Route for Manager
app.use("/manager", routers.manager);

// Route for Scheduler
app.use("/schedule", routers.schedule);

// Route for Classrooms
app.use("/classroom", routers.classroom);
app.use("/classrooms", routers.classrooms);

// Route for Topic
app.use("/topic", routers.topic);

// Route for Availability
app.use("/availability", routers.availability);

// Route for Appointment
app.use("/appointment", routers.appointment);

// Route for MasteryCheck
app.use("/masterycheck", routers.masterycheck);

app.use("/profile", routers.profile);

app.use("/question", routers.question);

// Route for GitHub login
app.use("/github", routers.github);

// Route to intercept webhooks from GitHub
app.use("/hook", routers.hook);


// Webhook
const smee = new SmeeClient({
  source: 'https://smee.io/UMN2a46A0lROwbE',
  target: 'http://localhost:3000/hook',
  // logger: console
})

smee.start()


// Route for 404 error
app.get("*", function (req, res) {
  res.status(404).render("page404");
});

app.set("port", PORT);

const server = app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + server.address().port);
});
