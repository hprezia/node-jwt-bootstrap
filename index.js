var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.json({status: "My API is alive!"});
});

app.listen(3000, function() {
  console.log("My API is running...");
});