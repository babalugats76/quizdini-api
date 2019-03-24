const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

app.use(cors());

app.get('/match/4', (req, res) => {
  console.log('received request...', req);
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

/* Use this redirect in lieu of the wildcard: http://localhost:5000/auth/google/callback */

// ClientID: 624001032721-0eeueit2htuk4fecq8h1vcvto2v573rd.apps.googleusercontent.com
// Client Secret: dxMcCjysrX46A79cLnkV_slq
//passport.use(new GoogleStrategy({}));

const PORT = process.env.port || 5000;
app.listen(PORT);
