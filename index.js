const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');

require('./models/User'); // Load before passport, etc.
require('./services/passport'); // Since nothing is being exported

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    domain: '.herokuapp.com'
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
