let clickedDate = "";
const events = [];
let eventId = '';

document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'timeGrid', 'list', 'interaction'], // an array of strings!,
    header: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
      center: 'title',
      right: 'today prev,next'
    },
    events: "/allevents",
    selectable: true,
    selectHelper: true,
    select: function(start, end, allDay) {
      $('#registerModal').modal({});
    },

    // When clicking an event
    // Show detail information about the event
    eventClick: function(info) {
      eventId = info.event.id;
      $("#event-id").val(eventId);
      $.ajax({
        url: "/event/" + eventId,
        method: "GET",
        success: function(event) {
          console.log("eventTitle = " + event.title);
          $('#detail-event-title').text(event.title);
          $('#eventInfoModal').modal({});
          $('#title').val(event.title);
          $('#event-id').val(event._id);
          $('#start-time').val(event.startTime);
          $('#end-time').val(event.endTime);
        }

      })

    }

  });

  // When clicking a date cell
  // Show a dialog for user to add an event
  calendar.on('dateClick', function(dateClickInfo) {
    console.log('clicked on ' + dateClickInfo.dateStr);
    $('#title').val("");
    $('#event-id').val("");
    $('#start-time').val("");
    $('#end-time').val("");
    $('#registerModal').modal({});

    // When a date is clicked
    // Get the date
    clickedDate = dateClickInfo.dateStr;
    console.log(clickedDate);
  });

  // Show calendar on the browser
  calendar.render();

  // Demo Bootstrap Modal Dialog
  $('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })

  // Handle what to do if the register modal is shown
  $('#registerModal').on('show.bs.modal', function(event) {
    setTimeout(function() {
      var modal = $(this);
      // modal.find('#date').val(clickedDate);
      $('#date').val(clickedDate);
    }, 200);
  })

  // When clicking the Register Button
  // Send POST Request to add an event
  $('#registerButton').on("click", function(event) {
    const id = $('#event-id').val();
    const title = $('#title').val();
    const startTime = $('#start-time').val();
    const endTime = $('#end-time').val();

    console.log("clicked event id = " + id);
    console.log("clicked event title = " + title);
    console.log("clicked event start time = " + startTime);
    console.log("clicked event end time = " + endTime);

    $.ajax({
      url: '/insert',
      method: "POST",
      data: {
        id: id,
        start: startTime,
        end: endTime,
        title: title
      },
      success: function(event) {
        console.log("success insert or edit an event")
        $('#registerModal').modal('hide');
        // Reload the calendar
        calendar.refetchEvents();
      },
      error: function(err) {
        console.log(err);
      }
    })

  })

  // When clicking the Edit Button of the Event Info Modal
  // Show Insert Modal
  $('#editButton').on("click", function() {
    $('#eventInfoModal').modal('hide');
    $('#registerModal').modal({});
  })
});

// Define function to get all events from database
function getEvents(callback) {
  $.ajax({
    url: '/allevents',
    method: "GET",
    success: function(events) {
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
      callback(calEvents);
    }
  })
}
