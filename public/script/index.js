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
    events: "/load",
    selectable: true,
    selectHelper: true,
    select: function(start, end, allDay) {
      $('#registerModal').modal({});
    }

  });

  calendar.on('dateClick', function(dateClickInfo) {
    console.log('clicked on ' + dateClickInfo.dateStr);
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
    const title = $('#title').val();
    const startTime = $('#start-time').val();
    const endTime = $('#end-time').val();

    $.ajax({
      url: '/insert',
      method: "POST",
      data: {
        start: startTime,
        end: endTime,
        title: title
      },
      success: function() {
        calendar.refetchEvents();
      }
    })

  })
});
