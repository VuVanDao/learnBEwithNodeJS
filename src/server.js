const express = require("express");
const bodyParser = require("body-parser");
const ViewEngine = require("./config/ViewEngine.js");
const initWebRoutes = require("./routes/web.js");
require("dotenv").config();
const connectDB = require("./config/connectDB.js");
const cors = require("cors");
let app = express();

app.use(cors({ credentials: true, origin: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

ViewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 1108;
app.listen(port, () => {
  console.log("BackEnd is running on port:" + port);
});
