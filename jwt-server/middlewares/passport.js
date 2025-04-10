const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CLIENT_URL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(profile);
  }
));