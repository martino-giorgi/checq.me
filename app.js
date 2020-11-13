const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const routers = require("./routes");

app.use("/", routers.home);

app.set("port", PORT);

const server = app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + server.address().port);
});
