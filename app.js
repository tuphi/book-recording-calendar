const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shiftUtil = require(__dirname + "/shift-util.js");

// Setup
// Express
const app = express();
// Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
// Static folder
app.use(express.static("public"));

// MongoDB, Mongoose
// Connect
mongoose.connect("mongodb://localhost:27017:/eventCalendarDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Event Schema
const eventSchema = new mongoose.Schema({
  _id: String,
  fullname: String,
  book: String,
  author: String,
  date: String,
  shift: String
})
const Event = mongoose.model("Event", eventSchema);
// Create a document
const event1 = new Event({
  _id: 1,
  fullname: "Phí Anh Tú",
  book: "Chí Phèo",
  author: "Nam Cao",
  date:
  shift: 1
})

// event1.save();

app.listen(3000, function() {
  console.log("Server is started on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  console.log(req.body);
  const date = req.body.date;
  const shift = req.body.shift;
  const shiftDetail = shiftUtil.getDetailTimeByShift(date, shift);
  console.log("shiftDetail = " + shiftDetail.startTime + " --> " + shiftDetail.endTime);
})
