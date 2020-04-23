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
    // events: "/load",
    selectable: true,
    selectHelper: true,
    select: function(start, end, allDay) {
      $('#registerModal').modal({});
    },
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
          $('#event-id').val(event.id);
          $('#start-time').val(event.startTime);
          $('#end-time').val(event.endTime);
        }

      })

    }

  });

  getEvents(function(events) {
    events.forEach(function(event) {
      let calEvents = [];
      events.forEach(function(event) {
        const calEvent = {
          id: event._id,
          title: event.title,
          start: event.startTime,
          end: event.endTime
        }
        console.log(calEvent);
        calendar.addEvent(calEvent);
      })

    })
  });

  calendar.on('dateClick', function(dateClickInfo) {
    console.log('clicked on ' + dateClickInfo.dateStr);
    $('#title').val("");
    $('#event-id').val("");
    $('#start-time').val("");
    $('#end-time').val("");
    $('#registerModal').modal({});

    clickedDate = dateClickInfo.dateStr;

    console.log(clickedDate);
    // console.log("date = " + info.date);
  });

  calendar.render();

  // Bootstrap Modal Dialog
  $('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })

  // Bootstrap Modal Dialog
  $('#registerModal').on('show.bs.modal', function(event) {
    setTimeout(function() {
      var modal = $(this);
      // modal.find('#date').val(clickedDate);
      $('#date').val(clickedDate);
    }, 200);
  })

  // Send POST Request to add an event
  $('#registerButton').on("click", function(event) {
    const id = $("#event-id").val();
    const title = $('#title').val();
    const startTime = $('#start-time').val();
    const endTime = $('#end-time').val();

    $.ajax({
      url: '/insert',
      method: "POST",
      data: {
        id: id,
        start: startTime,
        end: endTime,
        title: title
      },
      success: function() {
        calendar.refetchEvents();
      }
    })

  })

  // Show Insert Modal when clicking the Edit Button of the Event Info Modal
  $('#editButton').on("click", function() {
    $('#eventInfoModal').modal('hide');
    $('#registerModal').modal({});
  })
});

function getEvents(callback) {
  $.ajax({
    url: '/allevents',
    method: "GET",
    success: function(events) {
      callback(events);
    }
  })
}
