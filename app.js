const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server is started on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
