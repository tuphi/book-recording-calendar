let clickedDate = "";

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

    // When clicking an event
    // Show detail information about the event
    eventClick: function(info) {
      eventId = info.event.id;
      $("#event-id").val(eventId);
      $.ajax({
        url: "/event/" + eventId,
        method: "GET",
        success: function(event) {
          // $('#detail-event-title').text(event.title);
          $('#detail-date').val(event.date);
          $('#detail-fullname').val(event.fullname);
          $('#detail-book').val(event.book);
          $('#detail-author').val(event.author);
          $('#detail-shift').val(event.shift);
          $('#eventInfoModal').modal({});
          $('#event-id').val(event._id);
          $('#date').val(event.date);
          $('#fullname').val(event.fullname);
          $('#book').val(event.book);
          $('#author').val(event.author);
          $('#shift').val(event.shift);
        }

      })

    }

  });

  calendar.on('dateClick', function(dateClickInfo) {
    console.log('clicked on ' + dateClickInfo.dateStr);

    $('#date').val(dateClickInfo.dateStr);

    $('#registerModal').modal({});

    console.log(clickedDate);
    // console.log("date = " + info.date);
  });

  calendar.render();

  // Send POST Request to add an event
  $('#registerButton').on("click", function(event) {
    const id = $('#event-id').val();
    const date = $('#date').val();
    const shift = $('#shift').val();
    const fullname = $('#fullname').val();
    const book = $('#book').val();
    const author = $('#author').val();


    $.ajax({
        url: '/insert',
        method: "POST",
        data: {
          id: id,
          date: date,
          shift: shift,
          fullname: fullname,
          book: book,
          author: author
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

  }, 200);
})
