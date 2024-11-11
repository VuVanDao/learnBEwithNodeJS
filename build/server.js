"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var ViewEngine = require("./config/ViewEngine.js");
var initWebRoutes = require("./routes/web.js");
require("dotenv").config();
var connectDB = require("./config/connectDB.js");
var cors = require("cors");
var app = express();
app.use(cors({
  credentials: true,
  origin: true
}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
ViewEngine(app);
initWebRoutes(app);
connectDB();
var port = process.env.PORT || 1108;
app.listen(port, function () {
  console.log("BackEnd is running on port:" + port);
});