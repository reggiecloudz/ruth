const passport_jwt = require('passport-jwt');
const config = require('../config/config');
const User = require('../models/User');
/**
 * StrategyOptions interface
 * Using passport-jwt
 */
const opts = {
  jwtFromRequest: passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};
/**
 * Instance Strategy Class
 */
module.exports = new passport_jwt.Strategy(opts, (payload, done) => {
  try {
    const user = User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
