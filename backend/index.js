const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const { Groups } = require("./db");
const userRoutes = require("./users");

const app = express();

app.use(bodyParser.json());

app.use("/", express.static(path.resolve(__dirname, "..", "build")));
app.use("/users", userRoutes);
app.get("/groups", async (req, res, next) => {
  try {
    res.json(await Groups.findAll());
  } catch (error) {
    next(error);
  }
});

app.listen(5000, () => {
  console.log("App running on http://localhost:5000");
});

module.exports = app;
