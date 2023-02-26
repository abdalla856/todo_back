const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const notifier = require('node-notifier');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
const UserRoute = require("./routes/user.routes.js");
app.use("/api", UserRoute);

mongoose
  .connect(
    "mongodb+srv://hallo:fVlSrzjWJNoNIGW0@cluster0.up0yr.mongodb.net/test",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));