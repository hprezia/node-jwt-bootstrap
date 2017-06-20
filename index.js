var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
var jwt = require("jwt-simple");
var auth = require("./auth.js")();
var users = require("./mock/users.js");
var cfg = require("./passport.js");
var app = express();

// // parse application/x-www-form-urlencoded
// // for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(auth.initialize());

app.get("/", function(req, res) {
  res.json({status: "My API is alive!"});
});

app.post("/token", function(req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find(function(u) {
      return u.email === email && u.password === password;
    });
    if (user) {
      var payload = {id: user.id};
      var token = jwt.encode(payload, cfg.jwtSecret);
      res.json({token: token});
    } else {
      res.status(401).json({message:"no such user found"});
    }
  } else {
    res.status(401).json({message:"no such user found"});
  }
});

app.listen(3000, function() {
  console.log("My API is running...");
});