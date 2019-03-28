const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}))

/* Use this redirect in lieu of the wildcard: http://localhost:5000/auth/google/callback */

/**
 * Configure OAuth Passport strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token:', accessToken);
      console.log('refresh token:', refreshToken);
      console.log('profile:', profile);
    }
  )
);

/**
 * Contact Google have them prompt 
 * the user for permission / authentication
 * If given, a request will be sent to `callbackURL'
 * with metadata needed to make handshake which
 * will culminate in Google sending user's profile info
 */
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

/**
 * Implement route for `callbackURL`
 */
app.get('/auth/google/callback', 
  passport.authenticate('google')
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

app.post('/match', (req, res) => {
  console.log('Requesting to create a new record!');
  console.log(req.body);
  res.json(req.body);
});

const PORT = process.env.port || 5000;
app.listen(PORT);
