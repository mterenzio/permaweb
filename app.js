//Declare Dependencies
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//Routes
const Routes = require("./routes");

//Initializing Express
const app = express();

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/", Routes);

//Will load single HTML page in client/build/index.html
app.use(express.static(path.join(__dirname + "/client/build")));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Catch All Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
