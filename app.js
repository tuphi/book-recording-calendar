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
  title: String,
  startTime: String,
  endTime: String
})
const Event = mongoose.model("Event", eventSchema);
// Create a document

app.listen(3000, function() {
  console.log("Server is started on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  // console.log(req.body);

})

app.post("/insert", function(req, res) {
  console.log(req.body);
  const event = new Event({
    title: req.body.title,
    startTime: req.body.start,
    endTime: req.body.end
  })
  event.save();
})
