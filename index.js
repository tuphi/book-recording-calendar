let clickedDate = "";

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'timeGrid', 'list', 'interaction'], // an array of strings!,

    events: [
        {
          title: 'All Day Event',
          start: '2020-04-04'
        },
      ]
  });

  calendar.on('dateClick', function(dateClickInfo) {
    console.log('clicked on ' + dateClickInfo.dateStr);
    $('#registerModal').modal({});

    clickedDate = dateClickInfo.dateStr;

    console.log(clickedDate);
    // console.log("date = " + info.date);
  });

  calendar.render();
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
    $('#date').val(clickedDate);
  }, 100);
})
