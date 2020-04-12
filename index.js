document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid', 'timeGrid', 'list', 'interaction' ] // an array of strings!
  });

  calendar.on('dateClick', function(info) {
    console.log('clicked on ' + info.dateStr);
  });

  calendar.render();
});
