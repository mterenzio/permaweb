//Declare Dependencies
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//Routes
const Routes = require("./routes/index");

//Initializing Express
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://localhost/${process.env.MONGODB_URI}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch(err => {
    if (err) throw err;
    console.log("Couldn't connect to the database");
  });

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
