const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

/**
 * Function executed after strategy callback (user find)
 */
passport.serializeUser((user, done) => {
  // No error & serialize `id` key added to mongoDB collection via mongoose model
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializing...', id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 * Configure OAuth Passport strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id
      }).then(existingUser => {
        if (existingUser) {
          // If user already exists...
          done(null, existingUser); // call Passport callback, providing error and User
        } else {
          // If user does not exist
          new User({ googleId: profile.id })
            .save()
            .then(newUser => {
              done(null, newUser);
            })
            .catch(error => {
              done(error, null);
            });
        }
      });
    }
  )
);
