const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const keys = require('./config/keys');

app.use(cors());

/* Use this redirect in lieu of the wildcard: http://localhost:5000/auth/google/callback */

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/match/4', (req, res) => {
  //console.log('received request...', req);
  res.json({
    title: 'Basic Computer Science Vocabulary',
    topic: 'Programming',
    author: 'Mr. James Colestock',
    instructions: 'Take a moment to review key programming terms from Unit 1',
    config: {
      itemsPerBoard: 9,
      duration: 50
    },
    matches: ''
  });
});

const PORT = process.env.port || 5000;
app.listen(PORT);
