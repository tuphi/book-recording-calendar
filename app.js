var http = require('http');
var fs = require('fs');//Library for call files
http.createServer(function (req, res) {
  fs.readFile('fullcalendar.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(3000);
