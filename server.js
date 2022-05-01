const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
// const User = require("./app/controllers/user.controller.js");
const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const userRoute = require("./app/routes/user.routes");
app.use("/user", userRoute);

const transcriptRoute = require("./app/routes/transcript.routes");
app.use("/transcript", transcriptRoute);

const libraryRoute = require("./app/routes/library.routes");
app.use("/library", libraryRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
