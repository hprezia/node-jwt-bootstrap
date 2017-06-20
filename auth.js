// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var _ = require("lodash");
var users = require("./mock/users.js");
var cfg = require("./passport.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    var user = users[_.findIndex(users, {id: payload.id})] || null;
    if (user) {
      return done(null, {id: user.id});
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};