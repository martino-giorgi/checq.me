const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const routers = require("./routes");

app.use("/", routers.home);

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + server.address().port);
});
