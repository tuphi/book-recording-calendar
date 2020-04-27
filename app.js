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
mongoose.connect("mongodb://localhost:27017:/recordingCalendarDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Event Schema
const eventSchema = new mongoose.Schema({
  fullname: String,
  book: String,
  author: String,
  date: String,
  shift: String
})
const Event = mongoose.model("Event", eventSchema);

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


app.get("/allevents", function(req, res) {
  Event.find(function(err, events) {
    if (!err) {
      console.log("Num of events in DB = " + events.length);
      let calEvents = []
      events.forEach(function(event) {
        const detailTime = shiftUtil.getDetailTimeByShift(event.date, event.shift);
        const calEvent = {
          id: event._id,
          title: event.fullname + " - " + event.book + " - " + event.author,
          start: detailTime.start,
          end: detailTime.end
        }
        console.log(calEvent);
        calEvents.push(calEvent);
        // calendar.addEvent(calEvent);
      })
      res.send(calEvents);
    } else {
      console.log(err);
    }
  })
});

app.post("/insert", function(req, res) {
  const eventId = req.body.id;
  console.log("clicked event id = " + eventId);
  console.log(req.body);
  if(eventId !== "") {
    // Edit the eventTitle
    Event.findByIdAndUpdate(eventId, {
      fullname: req.body.fullname,
      book: req.body.book,
      author: req.body.author,
      date: req.body.date,
      shift: req.body.shift
    },
    function(err) {
      if(err) {
        console.log(err);
      } else {
        res.end('{"success" : "Updated Successfully", "status" : 200}');
        console.log("Updated an event");
      }
    }
  )
  } else {
    // Create a new event
    const event = new Event({
      fullname: req.body.fullname,
      book: req.body.book,
      author: req.body.author,
      date: req.body.date,
      shift: req.body.shift
    })
    event.save();
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  }
})


app.get("/event/:eventId", function(req, res) {
  const eventId = req.params.eventId;
  console.log(eventId);
  Event.findById(eventId, function(err, event) {
    res.send(event);
  })
});
