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

})

app.post("/insert", function(req, res) {
  const eventId = req.body.id;
  console.log("clicked event id = " + eventId);
  if(eventId !== "") {
    // Edit the eventTitle
    Event.findByIdAndUpdate(eventId, {
      title: req.body.title,
      startTime: req.body.start,
      endTime: req.body.end
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
      title: req.body.title,
      startTime: req.body.start,
      endTime: req.body.end
    })
    event.save();
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  }
})

app.get("/load", function(req, res) {
  // const event = {
  //   title: "Demo Event",
  //   start: "2020-01-02",
  //   end: "2020-01-03"
  // }
  // const events = [event];
  Event.find(function(err, events) {
    if (!err) {
      let calEvents = [];
      events.forEach(function(event) {
        const calEvent = {
          title: event.title,
          start: event.startTime,
          end: event.endTime
        }
        calEvents.push(calEvent);
      })
      res.send(calEvents);
    } else {
      console.log(err);
    }
  })
})

app.get("/allevents", function(req, res) {
  Event.find(function(err, events) {
    if (!err) {
      console.log("Num of events in DB = " + events.length);
      let calEvents = []
      events.forEach(function(event) {
        const calEvent = {
          id: event._id,
          title: event.title,
          start: event.startTime,
          end: event.endTime
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

app.get("/event/:eventId", function(req, res) {
  const eventId = req.params.eventId;
  console.log(eventId);
  Event.findById(eventId, function(err, event) {
    res.send(event);
  })
});
